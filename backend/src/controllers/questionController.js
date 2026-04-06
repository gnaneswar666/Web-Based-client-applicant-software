const Question = require('../models/Question');

const getNextQuestion = async (req, res) => {
  try {
    const question = await Question.aggregate([
      { $sample: { size: 1 } }
    ]);

    if (question.length === 0) {
      return res.status(404).json({ message: 'No questions available' });
    }

    res.json(question[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createQuestion = async (req, res) => {
  try {
    const { text, domain, difficulty, tags } = req.body;
    const question = await Question.create({
      text,
      domain,
      difficulty,
      tags,
    });

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getNextQuestion, createQuestion };