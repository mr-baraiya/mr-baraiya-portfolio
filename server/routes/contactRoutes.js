import express from 'express';
import Contact from '../models/Contact.js';
import mongoose from 'mongoose';
import { sendContactNotificationEmail } from '../config/mailer.js';

const router = express.Router();

const fallbackMessages = [
  {
    _id: 'msg-demo-1',
    name: 'Sarah Connor',
    email: 'sarah@techfuture.io',
    inquiryType: 'Freelance Project',
    subject: 'Project Collaboration Request',
    message: 'Hi Vishal! Loved your portfolio projects. We would love to discuss a potential Full-Stack React & Node project with you.',
    read: false,
    createdAt: new Date(Date.now() - 3600000 * 2)
  }
];

// GET all contact messages (Admin functionality)
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const messages = await Contact.find().sort({ createdAt: -1 });
      return res.json(messages);
    }
    return res.json(fallbackMessages);
  } catch (error) {
    res.json(fallbackMessages);
  }
});

// POST send message from Contact form to MongoDB with Validation & Email Notification
router.post('/', async (req, res) => {
  try {
    const { name, email, inquiryType, subject, message } = req.body;
    
    // 1. Strict Validation
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Please enter your full name (minimum 2 characters).' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }

    if (!inquiryType || inquiryType.trim() === '') {
      return res.status(400).json({ success: false, error: 'Please select an inquiry type from the dropdown.' });
    }

    if (!subject || subject.trim().length < 3) {
      return res.status(400).json({ success: false, error: 'Please enter a subject (minimum 3 characters).' });
    }

    if (!message || message.trim().length < 10) {
      return res.status(400).json({ success: false, error: 'Please enter a message (minimum 10 characters).' });
    }

    const cleanData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      inquiryType: inquiryType.trim(),
      subject: subject.trim(),
      message: message.trim()
    };

    let savedResult;

    if (mongoose.connection.readyState === 1) {
      const newContact = new Contact(cleanData);
      savedResult = await newContact.save();
      console.log(`[MongoDB] New contact message saved! ID: ${savedResult._id}`);
    } else {
      savedResult = {
        _id: `msg-${Date.now()}`,
        ...cleanData,
        read: false,
        createdAt: new Date()
      };
      fallbackMessages.unshift(savedResult);
    }

    // 2. Send Email Notification to Admin (baraiyavishalbhai32@gmail.com)
    sendContactNotificationEmail(cleanData).catch(err => {
      console.error('[Contact SMTP Notification Warning]:', err);
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully and notified to admin.',
      data: savedResult
    });

  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ success: false, error: 'Failed to process message. Please try again.' });
  }
});

// DELETE a contact message
router.delete('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await Contact.findByIdAndDelete(req.params.id);
      return res.json({ success: true, message: 'Message deleted from MongoDB database' });
    }
    const idx = fallbackMessages.findIndex(m => m._id === req.params.id);
    if (idx !== -1) fallbackMessages.splice(idx, 1);
    return res.json({ success: true, message: 'Message removed from memory' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
