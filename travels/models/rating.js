// models/rating.js

const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  reportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isHelpful: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure a user can rate a report only once
ratingSchema.index({ reportId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);
