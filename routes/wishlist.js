const express = require('express');
const { 
  addToWishlist, 
  getWishlist, 
  removeFromWishlist 
} = require('../controllers/Wishlist.js');
const { protect } = require('../middleware/auth.js');

const router = express.Router();

router.post('/', protect, addToWishlist);
router.get('/', protect, getWishlist);
router.delete('/:productId', protect, removeFromWishlist);

module.exports = router;