const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
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

// Get all questions with optional filtering
router.get('/', verifyToken, async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    let query = {};

    // Apply filters if provided
    if (category && category !== 'all') {
      query.category = category;
    }
    if (difficulty && difficulty !== 'all') {
      query.difficulty = difficulty;
    }
    if (search) {
      query.$or = [
        { question: { $regex: search, $options: 'i' } },
        { answer: { $regex: search, $options: 'i' } },
        { keywords: { $regex: search, $options: 'i' } }
      ];
    }

    const questions = await Question.find(query).sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ 
      message: 'Error fetching questions',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get a single question by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ 
      message: 'Error fetching question',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get questions by type
router.get('/', verifyToken, async (req, res) => {
  try {
    const { type = 'technical', category, difficulty } = req.query;
    
    // Build query based on filters
    const query = { type };
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;

    // Get 5 random questions of the specified type
    const questions = await Question.aggregate([
      { $match: query },
      { $sample: { size: 5 } },
      { $project: { 
        text: 1, 
        type: 1, 
        category: 1, 
        difficulty: 1,
        score: 1
      }}
    ]);

    if (!questions.length) {
      return res.status(404).json({ 
        message: `No questions found for type: ${type}` 
      });
    }

    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ 
      message: 'Error fetching questions',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Add a new question (admin only)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { text, type, category, difficulty, expectedAnswer, keywords } = req.body;

    const question = new Question({
      text,
      type,
      category,
      difficulty,
      expectedAnswer,
      keywords
    });

    await question.save();
    res.status(201).json(question);
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ 
      message: 'Error adding question',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update a question (admin only)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ 
      message: 'Error updating question',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Delete a question (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ 
      message: 'Error deleting question',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;