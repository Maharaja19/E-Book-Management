const express = require('express');
const ReadingProgress = require('../models/ReadingProgress');
const Book = require('../models/Book');

const router = express.Router();

// Get reading progress for a user and book
router.get('/:userId/:bookId', async (req, res) => {
  try {
    const progress = await ReadingProgress.findOne({
      user: req.params.userId,
      book: req.params.bookId
    }).populate([
      { path: 'user', select: 'name email' },
      { path: 'book', select: 'title author coverImage pages' }
    ]);
    
    if (!progress) {
      return res.status(404).json({ message: 'Reading progress not found' });
    }
    
    res.status(200).json({ progress });
  } catch (error) {
    console.error('Get reading progress error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create or update reading progress
router.post('/', async (req, res) => {
  try {
    const { userId, bookId, groupId, currentPage, totalPages, totalTimeRead, isCompleted } = req.body;
    
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Find existing progress or create new
    let progress = await ReadingProgress.findOne({
      user: userId,
      book: bookId
    });
    
    if (!progress) {
      progress = new ReadingProgress({
        user: userId,
        book: bookId,
        group: groupId,
        totalPages: totalPages || book.pages
      });
    }
    
    // Update progress
    if (currentPage !== undefined) {
      progress.currentPage = currentPage;
    }
    
    if (totalPages !== undefined) {
      progress.totalPages = totalPages;
    }
    
    if (totalTimeRead !== undefined) {
      progress.totalTimeRead = (progress.totalTimeRead || 0) + totalTimeRead;
    }
    
    if (isCompleted !== undefined) {
      progress.isCompleted = isCompleted;
      if (isCompleted && !progress.completionDate) {
        progress.completionDate = new Date();
      }
    }
    
    progress.lastReadAt = new Date();
    
    // Save progress
    await progress.save();
    
    // Populate details
    await progress.populate([
      { path: 'user', select: 'name email' },
      { path: 'book', select: 'title author coverImage pages' }
    ]);
    
    res.status(200).json({
      message: 'Reading progress updated successfully',
      progress
    });
  } catch (error) {
    console.error('Update reading progress error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a bookmark
router.post('/:userId/:bookId/bookmarks', async (req, res) => {
  try {
    const { page, content } = req.body;
    
    // Find existing progress or create new
    let progress = await ReadingProgress.findOne({
      user: req.params.userId,
      book: req.params.bookId
    });
    
    if (!progress) {
      return res.status(404).json({ message: 'Reading progress not found' });
    }
    
    // Add bookmark
    progress.bookmarks.push({
      page,
      content
    });
    
    await progress.save();
    
    res.status(200).json({
      message: 'Bookmark added successfully',
      bookmarks: progress.bookmarks
    });
  } catch (error) {
    console.error('Add bookmark error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get bookmarks for a user and book
router.get('/:userId/:bookId/bookmarks', async (req, res) => {
  try {
    const progress = await ReadingProgress.findOne({
      user: req.params.userId,
      book: req.params.bookId
    }, 'bookmarks');
    
    if (!progress) {
      return res.status(404).json({ message: 'Reading progress not found' });
    }
    
    res.status(200).json({ bookmarks: progress.bookmarks });
  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a note
router.post('/:userId/:bookId/notes', async (req, res) => {
  try {
    const { page, content } = req.body;
    
    // Find existing progress or create new
    let progress = await ReadingProgress.findOne({
      user: req.params.userId,
      book: req.params.bookId
    });
    
    if (!progress) {
      return res.status(404).json({ message: 'Reading progress not found' });
    }
    
    // Add note
    progress.notes.push({
      page,
      content
    });
    
    await progress.save();
    
    res.status(200).json({
      message: 'Note added successfully',
      notes: progress.notes
    });
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get notes for a user and book
router.get('/:userId/:bookId/notes', async (req, res) => {
  try {
    const progress = await ReadingProgress.findOne({
      user: req.params.userId,
      book: req.params.bookId
    }, 'notes');
    
    if (!progress) {
      return res.status(404).json({ message: 'Reading progress not found' });
    }
    
    res.status(200).json({ notes: progress.notes });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a highlight
router.post('/:userId/:bookId/highlights', async (req, res) => {
  try {
    const { page, content, color } = req.body;
    
    // Find existing progress or create new
    let progress = await ReadingProgress.findOne({
      user: req.params.userId,
      book: req.params.bookId
    });
    
    if (!progress) {
      return res.status(404).json({ message: 'Reading progress not found' });
    }
    
    // Add highlight
    progress.highlights.push({
      page,
      content,
      color: color || 'yellow'
    });
    
    await progress.save();
    
    res.status(200).json({
      message: 'Highlight added successfully',
      highlights: progress.highlights
    });
  } catch (error) {
    console.error('Add highlight error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get highlights for a user and book
router.get('/:userId/:bookId/highlights', async (req, res) => {
  try {
    const progress = await ReadingProgress.findOne({
      user: req.params.userId,
      book: req.params.bookId
    }, 'highlights');
    
    if (!progress) {
      return res.status(404).json({ message: 'Reading progress not found' });
    }
    
    res.status(200).json({ highlights: progress.highlights });
  } catch (error) {
    console.error('Get highlights error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user's reading statistics
router.get('/stats/:userId', async (req, res) => {
  try {
    // Get all reading progress for user
    const progresses = await ReadingProgress.find({ user: req.params.userId });
    
    // Calculate statistics
    const totalBooks = progresses.length;
    const completedBooks = progresses.filter(p => p.isCompleted).length;
    const totalReadingTime = progresses.reduce((sum, p) => sum + (p.totalTimeRead || 0), 0);
    const totalPagesRead = progresses.reduce((sum, p) => sum + (p.currentPage || 0), 0);
    
    // Get progress percentages for active books
    const activeBooks = progresses
      .filter(p => !p.isCompleted)
      .map(p => ({
        book: p.book,
        progress: p.progressPercentage
      }))
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 5); // Top 5 books by progress
    
    res.status(200).json({
      stats: {
        totalBooks,
        completedBooks,
        totalReadingTime, // in minutes
        totalPagesRead,
        activeBooks
      }
    });
  } catch (error) {
    console.error('Get reading stats error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;