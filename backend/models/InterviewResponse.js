const mongoose = require('mongoose');

const interviewResponseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  interviewType: {
    type: String,
    required: true,
    enum: ['technical', 'hr', 'domain', 'behavioral']
  },
  questions: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    response: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      default: 0
    },
    feedback: {
      strengths: [String],
      areasForImprovement: [String],
      overallFeedback: String
    }
  }],
  totalScore: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed'],
    default: 'in-progress'
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  }
}, {
  timestamps: true
});

// Calculate total score before saving
interviewResponseSchema.pre('save', function(next) {
  if (this.questions.length > 0) {
    this.totalScore = this.questions.reduce((sum, q) => sum + q.score, 0) / this.questions.length;
  }
  next();
});

const InterviewResponse = mongoose.model('InterviewResponse', interviewResponseSchema);

module.exports = InterviewResponse; 