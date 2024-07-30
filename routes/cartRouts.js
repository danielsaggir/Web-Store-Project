const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to add item to cart
router.post('/addCartItem', cartController.addCartItem);

// Route to get cart items
router.get('/getCartItems', cartController.getCartItems);

// Route to remove an item from the cart
router.delete('/removeCartItem', cartController.removeCartItem);

module.exports = router;
