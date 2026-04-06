const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', protect, async (req, res) => {
  try {
    // Fetch stats for logged-in user
    const stats = {
      totalInterviews: 10,
      completedInterviews: 7,
      pendingInterviews: 3
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats' });
  }
});

router.get('/recent-interviews', protect, async (req, res) => {
  try {
    const recentInterviews = [
      { 
        id: '1', 
        date: new Date(), 
        role: 'Frontend Developer', 
        status: 'Completed' 
      },
      // More interview data
    ];
    res.json(recentInterviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent interviews' });
  }
});

router.get('/skill-progress', protect, async (req, res) => {
  try {
    const skillProgress = [
      { name: 'React', percentage: 75 },
      { name: 'Node.js', percentage: 60 },
      { name: 'Database', percentage: 50 }
    ];
    res.json(skillProgress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skill progress' });
  }
});

module.exports = router;