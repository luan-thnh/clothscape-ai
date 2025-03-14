
const express = require('express');
const router = express.Router();
const { users } = require('../data');
const auth = require('../middleware/auth');

// @route   GET api/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/', auth, (req, res) => {
  // In a real app, check if user is admin here
  const safeUsers = users.map(({ password, ...user }) => user);
  res.json(safeUsers);
});

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', auth, (req, res) => {
  // Check if user is requesting their own info or is admin
  // In a real app, implement proper authorization here
  
  const user = users.find(u => u.id === req.params.id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const { password, ...safeUser } = user;
  res.json(safeUser);
});

// @route   PUT api/users/:id
// @desc    Update user
// @access  Private
router.put('/:id', auth, (req, res) => {
  // Check if user is updating their own info or is admin
  // In a real app, implement proper authorization here
  
  const userIndex = users.findIndex(u => u.id === req.params.id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Don't allow role or password changes through this endpoint
  const { role, password, ...updateData } = req.body;
  
  users[userIndex] = {
    ...users[userIndex],
    ...updateData
  };
  
  const { password: _, ...safeUser } = users[userIndex];
  
  res.json(safeUser);
});

module.exports = router;
