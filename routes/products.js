const express = require('express');
const { check } = require('express-validator');
const { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/Product.js');
const { protect, admin } = require('../middleware/auth.js');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post(
  '/', 
  [
    protect, 
    admin, 
    [
      check('name', 'Name is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('price', 'Price must be a positive number').isFloat({ min: 0 }),
      check('images', 'At least one image URL is required').isArray({ min: 1 }),
      check('category', 'Category is required').not().isEmpty(),
      check('quantity', 'Quantity must be a positive number').isInt({ min: 0 })
    ]
  ],
  createProduct
);

router.put(
  '/:id', 
  [
    protect, 
    admin,
    [
      check('name', 'Name is required').optional().not().isEmpty(),
      check('price', 'Price must be a positive number').optional().isFloat({ min: 0 }),
      check('quantity', 'Quantity must be a positive number').optional().isInt({ min: 0 })
    ]
  ],
  updateProduct
);

router.delete('/:id', [protect, admin], deleteProduct);

module.exports = router;