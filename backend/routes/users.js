const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user data (excluding sensitive information)
    res.json({
      name: user.name,
      email: user.email,
      experience: user.experience,
      skills: user.skills,
      preferredRole: user.preferredRole,
      about: user.about,
      education: user.education,
      certifications: user.certifications,
      linkedin: user.linkedin,
      github: user.github,
      portfolio: user.portfolio
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ 
      message: 'Error fetching profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update user profile
router.put('/updateProfile', verifyToken, async (req, res) => {
  try {
    const {
      name,
      experience,
      skills,
      preferredRole,
      about,
      education,
      certifications,
      linkedin,
      github,
      portfolio
    } = req.body;

    // Find user by ID
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    user.name = name || user.name;
    user.experience = experience || user.experience;
    user.skills = skills || user.skills;
    user.preferredRole = preferredRole || user.preferredRole;
    user.about = about || user.about;
    user.education = education || user.education;
    user.certifications = certifications || user.certifications;
    user.linkedin = linkedin || user.linkedin;
    user.github = github || user.github;
    user.portfolio = portfolio || user.portfolio;

    // Save updated user
    await user.save();

    // Return updated user data (excluding sensitive information)
    res.json({
      message: 'Profile updated successfully',
      name: user.name,
      email: user.email,
      experience: user.experience,
      skills: user.skills,
      preferredRole: user.preferredRole,
      about: user.about,
      education: user.education,
      certifications: user.certifications,
      linkedin: user.linkedin,
      github: user.github,
      portfolio: user.portfolio
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ 
      message: 'Error updating profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 