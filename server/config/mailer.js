import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Universal Email HTML Template (Readable in both Light Mode & Dark Mode Email Clients)
const renderEmailTemplate = ({ subtitle, contentHtml }) => {
  return `
    <div style="background-color: #f1f5f9; padding: 32px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        
        <!-- Header -->
        <div style="background-color: #ffffff; padding: 28px 32px 20px 32px; text-align: center; border-bottom: 2px solid #0d9488;">
          <h2 style="color: #0f766e; margin: 0; font-size: 20px; font-weight: 800; tracking-wide font-family: monospace;">Mr. Baraiya Portfolio</h2>
          <p style="color: #475569; font-size: 13px; margin: 6px 0 0 0; font-weight: 500;">${subtitle}</p>
        </div>
        
        <!-- Body Content -->
        <div style="padding: 28px 32px; background-color: #ffffff;">
          ${contentHtml}
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 18px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; font-size: 11px; color: #64748b; font-family: monospace;">Official System Notification · Mr. Baraiya Portfolio</p>
        </div>

      </div>
    </div>
  `;
};

// 1. Send Password Reset Email (Universal Light/Dark Mode)
export const sendResetPasswordEmail = async ({ to, resetUrl, username }) => {
  try {
    const transporter = createTransporter();

    const bodyHtml = `
      <p style="margin-top: 0; font-size: 15px; color: #0f172a;">Hello <strong>${username}</strong>,</p>
      <p style="font-size: 14px; color: #334155; line-height: 1.6;">You requested to reset your password for the Admin Dashboard console. Click the button below to set a new password:</p>
      
      <div style="text-align: center; margin: 28px 0;">
        <a href="${resetUrl}" style="background-color: #0d9488; color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 13px; font-family: monospace; display: inline-block; box-shadow: 0 2px 4px rgba(13, 148, 136, 0.2);">Reset Password Now</a>
      </div>

      <p style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Or copy and paste this link into your browser:</p>
      <p style="font-size: 11px; word-break: break-all; color: #0d9488; font-family: monospace; margin-top: 0;">${resetUrl}</p>
      
      <div style="margin-top: 24px; padding: 12px 16px; background-color: #fffbebfb; border-left: 4px solid #f59e0b; border-radius: 4px;">
        <p style="font-size: 12px; color: #92400e; margin: 0; font-weight: 500;">Note: This password reset link will expire in 1 hour for security reasons.</p>
      </div>
    `;

    const mailOptions = {
      from: `"Mr. Baraiya Portfolio Admin" <${process.env.SMTP_FROM}>`,
      to,
      subject: 'Password Reset Request — Portfolio Admin',
      html: renderEmailTemplate({
        subtitle: 'Password Reset Verification Email',
        contentHtml: bodyHtml
      })
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[SMTP Mailer] Password reset email sent! Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[SMTP Mailer Error]', error);
    throw error;
  }
};

// 2. Send Contact Form Notification Email (Universal Light/Dark Mode)
export const sendContactNotificationEmail = async ({ name, email, inquiryType, subject, message }) => {
  try {
    const transporter = createTransporter();
    const adminEmail = process.env.ADMIN_ALERT_EMAIL || process.env.SMTP_FROM;

    const bodyHtml = `
      <div style="margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid #f1f5f9;">
        <span style="font-size: 11px; color: #0d9488; text-transform: uppercase; font-weight: 700; font-family: monospace; letter-spacing: 0.5px;">From Sender</span>
        <p style="margin: 4px 0 0 0; font-size: 15px; font-weight: 700; color: #0f172a;">${name} &lt;${email}&gt;</p>
      </div>

      <div style="margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid #f1f5f9;">
        <span style="font-size: 11px; color: #0d9488; text-transform: uppercase; font-weight: 700; font-family: monospace; letter-spacing: 0.5px;">Inquiry Category</span>
        <div style="margin-top: 4px;">
          <span style="font-size: 12px; font-weight: 700; color: #0d9488; background-color: #ccfbf1; padding: 4px 12px; border-radius: 20px; display: inline-block; font-family: monospace;">${inquiryType || 'General'}</span>
        </div>
      </div>

      <div style="margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid #f1f5f9;">
        <span style="font-size: 11px; color: #0d9488; text-transform: uppercase; font-weight: 700; font-family: monospace; letter-spacing: 0.5px;">Subject</span>
        <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: 700; color: #0f172a;">${subject}</p>
      </div>

      <div style="margin-top: 20px;">
        <span style="font-size: 11px; color: #0d9488; text-transform: uppercase; font-weight: 700; font-family: monospace; letter-spacing: 0.5px;">Message Text</span>
        <div style="margin-top: 8px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 13px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${message}</div>
      </div>

      <div style="text-align: center; margin-top: 28px;">
        <a href="mailto:${email}" style="background-color: #0d9488; color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 13px; font-family: monospace; display: inline-block; box-shadow: 0 2px 4px rgba(13, 148, 136, 0.2);">Reply to ${name}</a>
      </div>
    `;

    const mailOptions = {
      from: `"Portfolio Contact Alert" <${process.env.SMTP_FROM}>`,
      to: adminEmail,
      replyTo: email,
      subject: `New Contact Form Submission: ${inquiryType || 'General'} — ${subject}`,
      html: renderEmailTemplate({
        subtitle: 'New Contact Form Submission',
        contentHtml: bodyHtml
      })
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[SMTP Contact Alert] Email notification sent to admin (${adminEmail})! Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[SMTP Contact Alert Error]', error);
    return { success: false, error: error.message };
  }
};
