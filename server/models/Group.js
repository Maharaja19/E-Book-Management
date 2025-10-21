const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    role: {
      type: String,
      enum: ['member', 'admin'],
      default: 'member'
    }
  }],
  books: [{
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    accessExpiry: {
      type: Date
    }
  }],
  maxMembers: {
    type: Number,
    default: 4
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure we don't exceed max members
groupSchema.pre('save', function (next) {
  if (this.members.length > this.maxMembers) {
    next(new Error(`Group cannot have more than ${this.maxMembers} members`));
  } else {
    next();
  }
});

module.exports = mongoose.model('Group', groupSchema);