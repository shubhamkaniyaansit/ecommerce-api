const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ user: userId });
    
    if (!wishlist) {
      wishlist = new Wishlist({
        user: userId,
        products: []
      });
    }

    if (wishlist.products.includes(productId)) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    wishlist.products.push(productId);

    await wishlist.save();

    const populatedWishlist = await Wishlist.findById(wishlist._id)
      .populate('products', 'name description price images inStock');
    
    res.status(201).json(populatedWishlist);
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const wishlist = await Wishlist.findOne({ user: userId })
      .populate('products', 'name description price images inStock');
    
    if (!wishlist) {
      return res.status(200).json({
        products: []
      });
    }
    
    res.json(wishlist);
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const wishlist = await Wishlist.findOne({ user: userId });
    
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter(product => product.toString() !== productId);

    await wishlist.save();

    const populatedWishlist = await Wishlist.findById(wishlist._id)
      .populate('products', 'name description price images inStock');
    
    res.json(populatedWishlist);
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist
};