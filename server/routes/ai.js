
const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');

// AI service URL
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5001';

// @route   POST api/ai/search
// @desc    Search products with AI
// @access  Public
router.post('/search', async (req, res) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/api/search`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error with AI search:', error.message);
    res.status(500).json({ message: 'AI search service error' });
  }
});

// @route   POST api/ai/recommendations
// @desc    Get AI-powered product recommendations
// @access  Public
router.post('/recommendations', async (req, res) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/api/recommendations`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error with AI recommendations:', error.message);
    res.status(500).json({ message: 'AI recommendations service error' });
  }
});

// @route   POST api/ai/track
// @desc    Track user activity for recommendations
// @access  Private
router.post('/track', auth, async (req, res) => {
  try {
    // Add user ID from auth token
    const data = {
      ...req.body,
      userId: req.user.id
    };
    
    const response = await axios.post(`${AI_SERVICE_URL}/api/track`, data);
    res.json(response.data);
  } catch (error) {
    console.error('Error tracking user activity:', error.message);
    res.status(500).json({ message: 'AI tracking service error' });
  }
});

// @route   POST api/ai/chatbot
// @desc    AI chatbot for product queries
// @access  Public
router.post('/chatbot', async (req, res) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/api/chatbot`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error with AI chatbot:', error.message);
    res.status(500).json({ message: 'AI chatbot service error' });
  }
});

module.exports = router;
