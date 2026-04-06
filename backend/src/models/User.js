const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['candidate', 'interviewer', 'admin'],
    default: 'candidate',
  },
  profile: {
    firstName: String,
    lastName: String,
    skills: [String],
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);