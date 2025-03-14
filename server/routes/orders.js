
const express = require('express');
const router = express.Router();
const { orders, products } = require('../data');
const auth = require('../middleware/auth');

// @route   GET api/orders
// @desc    Get all orders (admin only)
// @access  Private/Admin
router.get('/', auth, (req, res) => {
  // In a real app, check if user is admin here
  res.json(orders);
});

// @route   GET api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  // In a real app, check if user is owner of the order or admin
  
  res.json(order);
});

// @route   GET api/orders/user/:userId
// @desc    Get orders by user ID
// @access  Private
router.get('/user/:userId', auth, (req, res) => {
  // In a real app, check if user is requesting their own orders or is admin
  
  const userOrders = orders.filter(o => o.user_id === req.params.userId);
  res.json(userOrders);
});

// @route   POST api/orders
// @desc    Create an order
// @access  Private
router.post('/', auth, (req, res) => {
  const { items } = req.body;
  
  // Basic validation
  if (!items || !items.length) {
    return res.status(400).json({ message: 'Items are required' });
  }
  
  // Calculate total
  let total = 0;
  const orderItems = items.map(item => {
    const product = products.find(p => p.id === item.product_id);
    
    if (!product) {
      throw new Error(`Product with ID ${item.product_id} not found`);
    }
    
    // In a real app, check product stock here
    
    const itemTotal = product.price * item.quantity;
    total += itemTotal;
    
    return {
      product_id: item.product_id,
      quantity: item.quantity,
      price: product.price
    };
  });
  
  const newOrder = {
    id: (orders.length + 1).toString(),
    user_id: req.user.id, // From auth middleware
    items: orderItems,
    total,
    status: 'pending',
    created_at: new Date().toISOString()
  };
  
  orders.push(newOrder);
  
  res.status(201).json(newOrder);
});

// @route   PUT api/orders/:id
// @desc    Update order status (admin only)
// @access  Private/Admin
router.put('/:id', auth, (req, res) => {
  // In a real app, check if user is admin here
  
  const orderIndex = orders.findIndex(o => o.id === req.params.id);
  
  if (orderIndex === -1) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  const { status } = req.body;
  
  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }
  
  if (!['pending', 'shipped', 'delivered', 'canceled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  
  orders[orderIndex] = {
    ...orders[orderIndex],
    status
  };
  
  res.json(orders[orderIndex]);
});

module.exports = router;
