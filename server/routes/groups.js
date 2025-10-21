const express = require('express');
const Group = require('../models/Group');
const User = require('../models/User');
const Book = require('../models/Book');

const router = express.Router();

// Create a new group
router.post('/', async (req, res) => {
  try {
    const { name, description, maxMembers } = req.body;
    
    // Get user from token (in real implementation, verify token)
    const userId = req.body.userId || req.body.createdBy;
    
    if (!userId) {
      return res.status(401).json({ message: 'User ID required' });
    }
    
    // Create new group
    const group = new Group({
      name,
      description,
      createdBy: userId,
      maxMembers: maxMembers || 4,
      members: [{
        user: userId,
        role: 'admin'
      }]
    });
    
    // Save group to database
    await group.save();
    
    // Populate members and creator details
    await group.populate([
      { path: 'createdBy', select: 'name email' },
      { path: 'members.user', select: 'name email' }
    ]);
    
    res.status(201).json({
      message: 'Group created successfully',
      group
    });
  } catch (error) {
    console.error('Create group error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all groups for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const groups = await Group.find({
      'members.user': req.params.userId,
      isActive: true
    }).populate([
      { path: 'createdBy', select: 'name email' },
      { path: 'members.user', select: 'name email' },
      { path: 'books.book', select: 'title author coverImage' }
    ]);
    
    res.status(200).json({ groups });
  } catch (error) {
    console.error('Get user groups error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a specific group by ID
router.get('/:id', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate([
        { path: 'createdBy', select: 'name email' },
        { path: 'members.user', select: 'name email' },
        { path: 'books.book', select: 'title author coverImage' }
      ]);
    
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    
    res.status(200).json({ group });
  } catch (error) {
    console.error('Get group error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Join a group
router.post('/:id/join', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    
    // Get user from token (in real implementation, verify token)
    const userId = req.body.userId;
    if (!userId) {
      return res.status(401).json({ message: 'User ID required' });
    }
    
    // Check if user is already a member
    const isMember = group.members.some(member => 
      member.user.toString() === userId.toString()
    );
    
    if (isMember) {
      return res.status(400).json({ message: 'User is already a member' });
    }
    
    // Check if group is full
    if (group.members.length >= group.maxMembers) {
      return res.status(400).json({ message: 'Group is full' });
    }
    
    // Add user to group
    group.members.push({
      user: userId,
      role: 'member'
    });
    
    group.updatedAt = Date.now();
    await group.save();
    
    // Populate members
    await group.populate([
      { path: 'members.user', select: 'name email' }
    ]);
    
    res.status(200).json({
      message: 'Joined group successfully',
      group
    });
  } catch (error) {
    console.error('Join group error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Leave a group
router.post('/:id/leave', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    
    // Get user from token (in real implementation, verify token)
    const userId = req.body.userId;
    if (!userId) {
      return res.status(401).json({ message: 'User ID required' });
    }
    
    // Check if user is a member
    const memberIndex = group.members.findIndex(member => 
      member.user.toString() === userId.toString()
    );
    
    if (memberIndex === -1) {
      return res.status(400).json({ message: 'User is not a member' });
    }
    
    // Prevent admin from leaving if they are the only member
    const member = group.members[memberIndex];
    if (member.role === 'admin' && group.members.length === 1) {
      return res.status(400).json({ 
        message: 'Admin cannot leave if they are the only member. Delete the group instead.' 
      });
    }
    
    // Remove user from group
    group.members.splice(memberIndex, 1);
    group.updatedAt = Date.now();
    await group.save();
    
    res.status(200).json({
      message: 'Left group successfully'
    });
  } catch (error) {
    console.error('Leave group error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a book to group
router.post('/:id/books', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    
    const { bookId, accessDays } = req.body;
    
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Check if book is already in group
    const isBookInGroup = group.books.some(b => 
      b.book.toString() === bookId.toString()
    );
    
    if (isBookInGroup) {
      return res.status(400).json({ message: 'Book is already in group' });
    }
    
    // Add book to group
    group.books.push({
      book: bookId,
      accessExpiry: accessDays ? new Date(Date.now() + accessDays * 24 * 60 * 60 * 1000) : null
    });
    
    group.updatedAt = Date.now();
    await group.save();
    
    // Populate book details
    await group.populate([
      { path: 'books.book', select: 'title author coverImage' }
    ]);
    
    res.status(200).json({
      message: 'Book added to group successfully',
      group
    });
  } catch (error) {
    console.error('Add book to group error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Remove a book from group
router.delete('/:id/books/:bookId', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    
    // Find book in group
    const bookIndex = group.books.findIndex(b => 
      b.book.toString() === req.params.bookId.toString()
    );
    
    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found in group' });
    }
    
    // Remove book from group
    group.books.splice(bookIndex, 1);
    group.updatedAt = Date.now();
    await group.save();
    
    res.status(200).json({
      message: 'Book removed from group successfully'
    });
  } catch (error) {
    console.error('Remove book from group error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;