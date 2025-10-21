const express = require('express');
const Discussion = require('../models/Discussion');
const Book = require('../models/Book');

const router = express.Router();

// Create a new discussion
router.post('/', async (req, res) => {
  try {
    const { bookId, groupId, title, content, authorId } = req.body;
    
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Create new discussion
    const discussion = new Discussion({
      book: bookId,
      group: groupId,
      title,
      content,
      author: authorId
    });
    
    // Save discussion to database
    await discussion.save();
    
    // Populate author details
    await discussion.populate([
      { path: 'author', select: 'name email' }
    ]);
    
    res.status(201).json({
      message: 'Discussion created successfully',
      discussion
    });
  } catch (error) {
    console.error('Create discussion error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get discussions for a book
router.get('/book/:bookId', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build filter
    const filter = { book: req.params.bookId };
    
    // Get discussions with filter and pagination
    const discussions = await Discussion.find(filter)
      .populate([
        { path: 'author', select: 'name email' },
        { path: 'replies.author', select: 'name email' }
      ])
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const total = await Discussion.countDocuments(filter);
    
    res.status(200).json({
      discussions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get discussions error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a specific discussion by ID
router.get('/:id', async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id)
      .populate([
        { path: 'author', select: 'name email' },
        { path: 'replies.author', select: 'name email' }
      ]);
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    
    res.status(200).json({ discussion });
  } catch (error) {
    console.error('Get discussion error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a reply to a discussion
router.post('/:id/replies', async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    
    const { authorId, content, mentions } = req.body;
    
    // Add reply
    discussion.replies.push({
      author: authorId,
      content,
      mentions: mentions || []
    });
    
    discussion.updatedAt = new Date();
    await discussion.save();
    
    // Populate author details for the new reply
    await discussion.populate([
      { path: 'replies.author', select: 'name email' }
    ]);
    
    // Get the newly added reply (last one)
    const newReply = discussion.replies[discussion.replies.length - 1];
    
    res.status(200).json({
      message: 'Reply added successfully',
      reply: newReply
    });
  } catch (error) {
    console.error('Add reply error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Like a discussion
router.post('/:id/like', async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    
    const { userId } = req.body;
    
    // Check if user already liked
    const alreadyLiked = discussion.likes.some(like => 
      like.user.toString() === userId.toString()
    );
    
    if (alreadyLiked) {
      return res.status(400).json({ message: 'User already liked this discussion' });
    }
    
    // Add like
    discussion.likes.push({
      user: userId
    });
    
    discussion.updatedAt = new Date();
    await discussion.save();
    
    res.status(200).json({
      message: 'Discussion liked successfully',
      likesCount: discussion.likes.length
    });
  } catch (error) {
    console.error('Like discussion error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Unlike a discussion
router.post('/:id/unlike', async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    
    const { userId } = req.body;
    
    // Find like index
    const likeIndex = discussion.likes.findIndex(like => 
      like.user.toString() === userId.toString()
    );
    
    if (likeIndex === -1) {
      return res.status(400).json({ message: 'User has not liked this discussion' });
    }
    
    // Remove like
    discussion.likes.splice(likeIndex, 1);
    discussion.updatedAt = new Date();
    await discussion.save();
    
    res.status(200).json({
      message: 'Discussion unliked successfully',
      likesCount: discussion.likes.length
    });
  } catch (error) {
    console.error('Unlike discussion error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;