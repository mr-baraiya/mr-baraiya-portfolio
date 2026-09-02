import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import mongoose from 'mongoose';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { sendResetPasswordEmail } from '../config/mailer.js';

const router = express.Router();

// Auto-seed / sync Admin User directly in MongoDB
export const initAdminUser = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      const adminEmail = process.env.ADMIN_ALERT_EMAIL || 'baraiyavishalbhai32@gmail.com';
      const existingUser = await User.findOne({
        $or: [
          { email: adminEmail.toLowerCase() },
          { username: 'baraiyavishalbhai32@gmail.com' },
          { username: 'admin' }
        ]
      });

      if (!existingUser) {
        const adminUser = new User({
          username: adminEmail.toLowerCase(),
          email: adminEmail.toLowerCase(),
          password: 'admin123', // Will be hashed via User.js pre-save hook
          role: 'admin'
        });
        await adminUser.save();
        console.log(`[MongoDB Auth] Admin user created! Email/Username: ${adminEmail}`);
      } else {
        existingUser.email = adminEmail.toLowerCase();
        existingUser.role = 'admin';
        await existingUser.save();
        console.log(`[MongoDB Auth] Admin user synchronized for: ${adminEmail}`);
      }
    }
  } catch (err) {
    console.warn(`[MongoDB Auth Warning] Admin user check: ${err.message}`);
  }
};

// POST /api/auth/login — Authenticate against MongoDB database using bcryptjs
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Please provide both username and password' });
    }

    if (mongoose.connection.readyState !== 1) {
      const connected = await connectDB();
      if (connected) {
        await initAdminUser();
      }
    }

    const adminEmail = (process.env.ADMIN_ALERT_EMAIL || 'baraiyavishalbhai32@gmail.com').toLowerCase().trim();
    const adminPass = process.env.ADMIN_PASSWORD || 'admin123';
    const inputUser = (username || '').toLowerCase().trim();

    // If MongoDB is connected, attempt DB lookup
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({
        $or: [
          { username: inputUser },
          { email: inputUser }
        ]
      });

      if (user) {
        const isMatch = await user.comparePassword(password);
        if (isMatch) {
          const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'mr_baraiya_secret_jwt_key_2026',
            { expiresIn: '7d' }
          );
          return res.json({
            success: true,
            token,
            user: { username: user.username, email: user.email, role: user.role }
          });
        }
      }
    }

    // Fallback Admin authentication (if DB is disconnected or initial admin login)
    if (
      (inputUser === adminEmail || inputUser === 'admin' || inputUser === 'baraiyavishalbhai32@gmail.com') &&
      password === adminPass
    ) {
      const token = jwt.sign(
        { id: 'admin-fallback-id', username: adminEmail, email: adminEmail, role: 'admin' },
        process.env.JWT_SECRET || 'mr_baraiya_secret_jwt_key_2026',
        { expiresIn: '7d' }
      );
      return res.json({
        success: true,
        token,
        user: { username: adminEmail, email: adminEmail, role: 'admin' }
      });
    }

    return res.status(401).json({ success: false, error: 'Invalid username or password' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, error: 'Server authentication error' });
  }
});

// POST /api/auth/forgot-password — Request password reset email
router.post('/forgot-password', async (req, res) => {
  try {
    const { usernameOrEmail } = req.body;

    if (!usernameOrEmail) {
      return res.status(400).json({ success: false, error: 'Please enter your admin username or email address' });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, error: 'MongoDB database connection unavailable' });
    }

    const user = await User.findOne({
      $or: [
        { username: usernameOrEmail.toLowerCase().trim() },
        { email: usernameOrEmail.toLowerCase().trim() }
      ]
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'No admin user found with that username or email' });
    }

    // Generate random raw reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash token to store in MongoDB
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 3600000; // Token valid for 1 hour
    await user.save({ validateBeforeSave: false });

    // Construct reset URL for frontend
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const resetUrl = `${clientUrl}/admin/reset-password?token=${resetToken}`;

    // Send email via Nodemailer
    await sendResetPasswordEmail({
      to: user.email,
      resetUrl,
      username: user.username
    });

    res.json({
      success: true,
      message: `Password reset email sent successfully to ${user.email}!`
    });

  } catch (error) {
    console.error('Error in forgot-password:', error);
    res.status(500).json({ success: false, error: 'Failed to send password reset email. Check SMTP credentials.' });
  }
});

// POST /api/auth/reset-password — Reset password with token
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ success: false, error: 'Token and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long' });
    }

    // Hash token to match database
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid or expired password reset token' });
    }

    // Update password (will be hashed with bcryptjs by pre-save hook)
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    console.log(`[MongoDB Auth] Password reset successfully for admin user: ${user.username}`);

    res.json({
      success: true,
      message: 'Password reset successful! You can now login with your new password.'
    });

  } catch (error) {
    console.error('Error in reset-password:', error);
    res.status(500).json({ success: false, error: 'Failed to reset password' });
  }
});

// GET /api/auth/verify
router.get('/verify', protectAdmin, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// PUT /api/auth/change-password — Change Admin Password (Protected)
router.put('/change-password', protectAdmin, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, error: 'All password fields are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'New password must be at least 6 characters long.' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, error: 'New password and confirm password do not match.' });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ success: false, error: 'New password must be different from current password.' });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, error: 'MongoDB database connection unavailable.' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'Admin user account not found.' });
    }

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Incorrect current password. Please check and try again.' });
    }

    // Update password (User pre-save hook will hash it)
    user.password = newPassword;
    await user.save();

    console.log(`[MongoDB Auth] Password changed successfully for admin: ${user.username}`);

    return res.json({
      success: true,
      message: 'Admin password changed successfully!'
    });

  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ success: false, error: 'Server error while changing password.' });
  }
});

export default router;
