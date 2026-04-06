const express = require('express');
const router = express.Router();

// Get all interviews
router.get('/', (req, res) => {
  res.json({ message: 'Get all interviews' });
});

// Get single interview
router.get('/:id', (req, res) => {
  res.json({ message: `Get interview ${req.params.id}` });
});

// Create interview
router.post('/', (req, res) => {
  res.json({ message: 'Create interview' });
});

// Update interview
router.put('/:id', (req, res) => {
  res.json({ message: `Update interview ${req.params.id}` });
});

// Delete interview
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete interview ${req.params.id}` });
});

module.exports = router; 