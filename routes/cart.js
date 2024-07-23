const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

// Add a new item to the cart
router.post('/cart', async (req, res) => {
    const { productName, productSize, productPrice, productImg, userId } = req.body;
    const newItem = new CartItem({ productName, productSize, productPrice, productImg, userId });
    await newItem.save();
    res.status(201).send(newItem);
});

// Get all cart items for a user
router.get('/cart/:userId', async (req, res) => {
    const { userId } = req.params;
    const items = await CartItem.find({ userId });
    res.status(200).send(items);
});

// Remove an item from the cart
router.delete('/cart/:id', async (req, res) => {
    const { id } = req.params;
    await CartItem.findByIdAndDelete(id);
    res.status(204).send();
});

module.exports = router;
