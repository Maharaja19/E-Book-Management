const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  book_ref: {type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true},
  filetype: {type: String, enum: ['pdf', 'epub'], required: true},
  uploadedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Upload', uploadSchema);
