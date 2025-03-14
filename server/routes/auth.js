
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../data');

// @route   POST api/auth/signup
// @desc    Register a user
// @access  Public
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  
  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }
  
  // Check if user exists
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  // Create user
  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    password: hashedPassword,
    role: 'user',
    created_at: new Date().toISOString()
  };
  
  users.push(newUser);
  
  // Create JWT token
  const payload = {
    user: {
      id: newUser.id,
      role: newUser.role
    }
  };
  
  jwt.sign(
    payload,
    process.env.JWT_SECRET || 'jwtSecret', // Use environment variable in production
    { expiresIn: '1h' },
    (err, token) => {
      if (err) throw err;
      
      const { password, ...userWithoutPassword } = newUser;
      
      res.status(201).json({
        token,
        user: userWithoutPassword
      });
    }
  );
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }
  
  // Check if user exists
  const user = users.find(user => user.email === email);
  
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  
  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  
  // Create JWT token
  const payload = {
    user: {
      id: user.id,
      role: user.role
    }
  };
  
  jwt.sign(
    payload,
    process.env.JWT_SECRET || 'jwtSecret', // Use environment variable in production
    { expiresIn: '1h' },
    (err, token) => {
      if (err) throw err;
      
      const { password, ...userWithoutPassword } = user;
      
      res.json({
        token,
        user: userWithoutPassword
      });
    }
  );
});

module.exports = router;
