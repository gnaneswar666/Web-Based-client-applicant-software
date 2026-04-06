const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { feedback, rating } = req.body;
  
  // Log the feedback (or save it to a database)
  console.log('Feedback:', feedback, 'Rating:', rating);
  
  // Send a success response
  res.status(200).json({ message: 'Feedback submitted successfully' });
});

module.exports = router; 