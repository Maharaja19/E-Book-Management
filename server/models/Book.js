const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookname: {type: String, required: true, trim: true},
  description: {type: String},
  image_url: {type: String},
  book_url: {type: String},
  book_type: {type: String, enum: ['pdf', 'epub'], default: 'pdf'},
  genre: {type: String},
  amount_flag: {type: Boolean, default: false},
  amount: {type: Number, default: 0},
  language: {type: String, default: 'English'}
  });

module.exports = mongoose.model('Book', bookSchema);
