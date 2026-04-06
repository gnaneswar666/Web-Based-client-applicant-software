const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  responseText: {
    type: String,
    required: true,
  },
  relevanceScore: {
    type: Number,
    min: 0,
    max: 10,
  },
  qualityScore: {
    type: Number,
    min: 0,
    max: 10,
  },
}, { timestamps: true });

module.exports = mongoose.model('Response', ResponseSchema);