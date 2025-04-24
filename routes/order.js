const express = require('express');
const { 
  createOrder, 
  getUserOrders, 
  getOrderById 
} = require('../controllers/Order.js');
const { protect } = require('../middleware/auth.js');

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);
router.get('/:id', protect, getOrderById);

module.exports = router;