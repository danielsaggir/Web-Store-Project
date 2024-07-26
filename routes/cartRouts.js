const express = require('express');
const router = express.Router();
const CartList = require('../models/cartList');

// Route to add item to cart
router.post('/addCartItem', async (req, res) => {
    try {
        const { username, cartItem } = req.body;
        const newCartItem = new CartList({
            username,
            ...cartItem
        });
        await newCartItem.save();
        res.status(201).json({ message: 'Item added to cart' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Failed to add item to cart' });
    }
});

// Route to get cart items
router.get('/getCartItems', async (req, res) => {
    try {
        const { username } = req.query;
        const cartItems = await CartList.find({ username });
        res.json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Failed to fetch cart items' });
    }
});

// Route to remove an item from the cart
router.delete('/removeCartItem', async (req, res) => {
    try {
        const { username, itemId } = req.body;
        // Find the cart item by username and itemId and remove it
        const result = await CartList.findOneAndDelete({ username: username, _id: itemId });

        if (result) {
            res.status(200).json({ message: 'Item removed from cart' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Failed to remove item from cart' });
    }
});

module.exports = router;
