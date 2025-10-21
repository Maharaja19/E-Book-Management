const mongoose = require('mongoose');

const readingProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number
  },
  progressPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  totalTimeRead: {
    type: Number, // in minutes
    default: 0
  },
  lastReadAt: {
    type: Date,
    default: Date.now
  },
  bookmarks: [{
    page: Number,
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  notes: [{
    page: Number,
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isCompleted: {
    type: Boolean,
    default: false
  },
  completionDate: {
    type: Date
  }
});

// Update progress percentage before saving
readingProgressSchema.pre('save', function (next) {
  if (this.totalPages > 0) {
    this.progressPercentage = Math.round((this.currentPage / this.totalPages) * 100);
    if (this.progressPercentage >= 100) {
      this.isCompleted = true;
      this.completionDate = new Date();
    }
  }
  next();
});

module.exports = mongoose.model('ReadingProgress', readingProgressSchema);