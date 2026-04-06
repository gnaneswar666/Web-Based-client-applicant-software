const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const { protect } = require('../middleware/authMiddleware');

// Get all questions with optional filtering
router.get('/', protect, async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    let query = {};

    // Apply filters if provided
    if (category && category !== 'All') {
      query.category = category;
    }
    if (difficulty && difficulty !== 'All') {
      query.difficulty = difficulty;
    }
    if (search) {
      query.text = { $regex: search, $options: 'i' };
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
router.get('/:id', protect, async (req, res) => {
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
router.get('/', protect, async (req, res) => {
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

// Create a new question
router.post('/', protect, async (req, res) => {
  try {
    const { text, category, difficulty, expectedDuration } = req.body;
    
    const question = new Question({
      text,
      category,
      difficulty,
      expectedDuration,
      createdBy: req.user.id
    });

    await question.save();
    res.status(201).json(question);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ 
      message: 'Error creating question',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update a question
router.put('/:id', protect, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Check if user owns the question
    if (question.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this question' });
    }

    const { text, category, difficulty, expectedDuration } = req.body;
    question.text = text || question.text;
    question.category = category || question.category;
    question.difficulty = difficulty || question.difficulty;
    question.expectedDuration = expectedDuration || question.expectedDuration;

    await question.save();
    res.json(question);
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ 
      message: 'Error updating question',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Delete a question
router.delete('/:id', protect, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Check if user owns the question
    if (question.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this question' });
    }

    await question.remove();
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