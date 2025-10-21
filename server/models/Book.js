const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  publisher: {
    type: String,
    trim: true
  },
  publishDate: {
    type: Date
  },
  language: {
    type: String,
    default: 'en'
  },
  pages: {
    type: Number
  },
  coverImage: {
    type: String // URL to cover image
  },
  pdfUrl: {
    type: String, // URL to PDF file
    required: true
  },
  fileSize: {
    type: Number // in bytes
  },
  price: {
    type: Number,
    default: 0,
    min: 0
  },
  accessType: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free'
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  tags: [{
    type: String,
    trim: true
  }],
  averageRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Book', bookSchema);