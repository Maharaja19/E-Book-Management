const express = require('express');
const multer = require('multer');
const Book = require('../models/Book');
const User = require('../models/User');
const { bookValidation } = require('../validators/books');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Get all books with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter = {};
    
    if (req.query.genre) {
      filter.genre = new RegExp(req.query.genre, 'i');
    }
    
    if (req.query.accessType) {
      filter.accessType = req.query.accessType;
    }
    
    if (req.query.search) {
      filter.$or = [
        { title: new RegExp(req.query.search, 'i') },
        { author: new RegExp(req.query.search, 'i') }
      ];
    }
    
    // Get books with filter and pagination
    const books = await Book.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ uploadDate: -1 });
    
    // Get total count for pagination
    const total = await Book.countDocuments(filter);
    
    res.status(200).json({
      books,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a specific book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json({ book });
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new book (Admin only)
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const { error } = bookValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    
    // Check if user is admin
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }
    
    // In a real implementation, you would verify the token and check user role
    // For now, we'll assume admin access for this endpoint
    
    // Create new book
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      isbn: req.body.isbn,
      genre: req.body.genre,
      publisher: req.body.publisher,
      publishDate: req.body.publishDate,
      language: req.body.language,
      pages: req.body.pages,
      coverImage: req.body.coverImage,
      pdfUrl: req.body.pdfUrl,
      fileSize: req.body.fileSize,
      price: req.body.price,
      accessType: req.body.accessType,
      isPublished: req.body.isPublished,
      uploadedBy: req.body.uploadedBy,
      tags: req.body.tags
    });
    
    // Save book to database
    await book.save();
    
    res.status(201).json({
      message: 'Book created successfully',
      book
    });
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a book (Admin only)
router.put('/:id', async (req, res) => {
  try {
    // Validate request body
    const { error } = bookValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    
    // Check if user is admin
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }
    
    // In a real implementation, you would verify the token and check user role
    
    // Update book
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        isbn: req.body.isbn,
        genre: req.body.genre,
        publisher: req.body.publisher,
        publishDate: req.body.publishDate,
        language: req.body.language,
        pages: req.body.pages,
        coverImage: req.body.coverImage,
        pdfUrl: req.body.pdfUrl,
        fileSize: req.body.fileSize,
        price: req.body.price,
        accessType: req.body.accessType,
        isPublished: req.body.isPublished,
        tags: req.body.tags
      },
      { new: true } // Return updated document
    );
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json({
      message: 'Book updated successfully',
      book
    });
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a book (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    // Check if user is admin
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }
    
    // In a real implementation, you would verify the token and check user role
    
    // Delete book
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json({
      message: 'Book deleted successfully'
    });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Upload book PDF (Admin only)
router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // In a real implementation, you would store the file in cloud storage
    // and return the URL. For now, we'll return a local path.
    
    res.status(200).json({
      message: 'File uploaded successfully',
      filePath: `/uploads/${req.file.filename}`,
      fileName: req.file.originalname
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;