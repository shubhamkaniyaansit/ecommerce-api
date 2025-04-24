const express = require('express');
const { 
  addToCart, 
  getCart, 
  updateCartItem, 
  removeCartItem 
} = require('../controllers/Cart.js');
const { protect } = require('../middleware/auth.js');

const router = express.Router();

router.post('/', protect, addToCart);
router.get('/', protect, getCart);
router.put('/:productId', protect, updateCartItem);
router.delete('/:productId', protect, removeCartItem);

module.exports = router;