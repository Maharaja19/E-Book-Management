const express = require('express');
const aiService = require('../services/aiService');

const router = express.Router();

// Summarize text content
router.post('/summarize', async (req, res) => {
  try {
    const { content, model } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }
    
    const summary = await aiService.summarize(content, model);
    
    res.status(200).json({
      summary
    });
  } catch (error) {
    console.error('Summarize error:', error);
    res.status(500).json({ message: 'Failed to generate summary' });
  }
});

// Generate flashcards from content
router.post('/flashcards', async (req, res) => {
  try {
    const { content, model } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }
    
    const flashcards = await aiService.generateFlashcards(content, model);
    
    res.status(200).json({
      flashcards
    });
  } catch (error) {
    console.error('Flashcards error:', error);
    res.status(500).json({ message: 'Failed to generate flashcards' });
  }
});

// Generate quiz from content
router.post('/quiz', async (req, res) => {
  try {
    const { content, numQuestions, model } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }
    
    const quiz = await aiService.generateQuiz(content, numQuestions, model);
    
    res.status(200).json({
      quiz
    });
  } catch (error) {
    console.error('Quiz error:', error);
    res.status(500).json({ message: 'Failed to generate quiz' });
  }
});

// Chat with AI about book content
router.post('/chat', async (req, res) => {
  try {
    const { content, question, model } = req.body;
    
    if (!content || !question) {
      return res.status(400).json({ message: 'Content and question are required' });
    }
    
    const response = await aiService.chatWithBook(content, question, model);
    
    res.status(200).json({
      response
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ message: 'Failed to get response from AI' });
  }
});

// Analyze content for academic insights
router.post('/analyze', async (req, res) => {
  try {
    const { content, model } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }
    
    const analysis = await aiService.analyzeContent(content, model);
    
    res.status(200).json({
      analysis
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ message: 'Failed to analyze content' });
  }
});

module.exports = router;