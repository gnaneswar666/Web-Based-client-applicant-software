const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const InterviewResponse = require('../../models/InterviewResponse');
const Question = require('../models/Question');

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

// Start new interview
router.post('/start', verifyToken, async (req, res) => {
  try {
    const { type } = req.body;
    
    // Create new interview response
    const interview = new InterviewResponse({
      userId: req.userId,
      interviewType: type,
      status: 'in-progress',
      startTime: new Date()
    });

    await interview.save();

    res.status(201).json({
      message: 'Interview started successfully',
      interviewId: interview._id
    });
  } catch (error) {
    console.error('Error starting interview:', error);
    res.status(500).json({ 
      message: 'Error starting interview',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Submit interview response
router.post('/responses', verifyToken, async (req, res) => {
  try {
    const { interviewId, questionId, response } = req.body;

    // Find the interview
    const interview = await InterviewResponse.findOne({
      _id: interviewId,
      userId: req.userId,
      status: 'in-progress'
    });

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found or already completed' });
    }

    // Find the question to get expected answer and keywords
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Generate feedback (simplified version - you can enhance this with AI)
    const feedback = generateFeedback(response, question.expectedAnswer, question.keywords);
    
    // Add response to interview
    interview.questions.push({
      questionId,
      response,
      score: feedback.score,
      feedback: {
        strengths: feedback.strengths,
        areasForImprovement: feedback.areasForImprovement,
        overallFeedback: feedback.message
      }
    });

    await interview.save();

    res.json(feedback);
  } catch (error) {
    console.error('Error submitting response:', error);
    res.status(500).json({ 
      message: 'Error submitting response',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// End interview
router.post('/end', verifyToken, async (req, res) => {
  try {
    const { interviewId } = req.body;

    const interview = await InterviewResponse.findOne({
      _id: interviewId,
      userId: req.userId,
      status: 'in-progress'
    });

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found or already completed' });
    }

    interview.status = 'completed';
    interview.endTime = new Date();
    await interview.save();

    res.json({
      message: 'Interview completed successfully',
      totalScore: interview.totalScore
    });
  } catch (error) {
    console.error('Error ending interview:', error);
    res.status(500).json({ 
      message: 'Error ending interview',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get interview history
router.get('/history', verifyToken, async (req, res) => {
  try {
    const interviews = await InterviewResponse.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .populate('questions.questionId', 'text type category');

    res.json(interviews);
  } catch (error) {
    console.error('Error fetching interview history:', error);
    res.status(500).json({ 
      message: 'Error fetching interview history',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Helper function to generate feedback
function generateFeedback(response, expectedAnswer, keywords) {
  // Simple scoring based on keyword matching (you can enhance this with AI)
  const responseWords = response.toLowerCase().split(/\s+/);
  const keywordMatches = keywords.filter(keyword => 
    responseWords.includes(keyword.toLowerCase())
  ).length;
  
  const score = Math.min(100, (keywordMatches / keywords.length) * 100);
  
  const strengths = [];
  const areasForImprovement = [];

  if (keywordMatches > keywords.length * 0.7) {
    strengths.push('Excellent use of technical terms');
  } else if (keywordMatches > keywords.length * 0.4) {
    strengths.push('Good understanding of concepts');
  }

  if (response.length > 100) {
    strengths.push('Detailed response');
  }

  if (keywordMatches < keywords.length * 0.5) {
    areasForImprovement.push('Could include more technical terms');
  }

  if (response.length < 50) {
    areasForImprovement.push('Response could be more detailed');
  }

  return {
    score,
    message: 'Thank you for your response!',
    strengths: strengths.length ? strengths : ['Clear communication'],
    areasForImprovement: areasForImprovement.length ? 
      areasForImprovement : ['Continue practicing with more examples']
  };
}

module.exports = router;