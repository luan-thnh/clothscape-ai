
const express = require('express');
const router = express.Router();
const { products } = require('../data');
const auth = require('../middleware/auth');

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', (req, res) => {
  res.json(products);
});

// @route   GET api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json(product);
});

// @route   POST api/products
// @desc    Create a product
// @access  Private/Admin
router.post('/', auth, (req, res) => {
  // In a real app, check if user is admin here
  const { name, description, price, category, stock, images, colors, sizes, tag } = req.body;
  
  // Basic validation
  if (!name || !description || !price || !category) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }
  
  const newProduct = {
    id: (products.length + 1).toString(),
    name,
    description,
    price: parseFloat(price),
    category,
    subcategory: req.body.subcategory || '',
    stock: parseInt(stock),
    images: images || [],
    colors: colors || [],
    sizes: sizes || [],
    tag: tag || null,
    created_at: new Date().toISOString()
  };
  
  products.push(newProduct);
  
  res.status(201).json(newProduct);
});

// @route   PUT api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put('/:id', auth, (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  const updatedProduct = {
    ...products[productIndex],
    ...req.body,
    price: parseFloat(req.body.price || products[productIndex].price),
    stock: parseInt(req.body.stock || products[productIndex].stock)
  };
  
  products[productIndex] = updatedProduct;
  
  res.json(updatedProduct);
});

// @route   DELETE api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/:id', auth, (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  const removedProduct = products.splice(productIndex, 1);
  
  res.json({ message: 'Product removed', product: removedProduct[0] });
});

module.exports = router;
