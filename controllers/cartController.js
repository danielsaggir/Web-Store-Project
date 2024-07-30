const CartList = require('../models/cartList');

// Function to add or update item in cart
exports.addCartItem = async (req, res) => {
    try {
        const { username, cartItem } = req.body;

        // Check if all required fields are provided
        if (!username || !cartItem) {
            return res.status(400).json({ message: 'Username and cart item details are required' });
        }

        // Check if the item already exists in the cart
        const existingItem = await CartList.findOne({ username, productId: cartItem.productId });

        if (existingItem) {
            // Update existing item
            existingItem.quantity += cartItem.quantity;
            existingItem.totalPrice = (existingItem.productPrice * existingItem.quantity).toFixed(2);
            existingItem.selectedSize = cartItem.selectedSize;

            await existingItem.save();
            return res.status(200).json({ message: 'Cart item updated successfully' });
        } else {
            // Add new item
            const newCartItem = new CartList({
                username,
                ...cartItem
            });

            await newCartItem.save();
            return res.status(201).json({ message: 'Item added to cart' });
        }
    } catch (error) {
        console.error('Error adding or updating item in cart:', error);
        res.status(500).json({ message: 'Failed to add or update item in cart' });
    }
};

// Function to get cart items
exports.getCartItems = async (req, res) => {
    try {
        const { username } = req.query;

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        const cartItems = await CartList.find({ username });

        res.json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Failed to fetch cart items' });
    }
};

// Function to remove an item from the cart
exports.removeCartItem = async (req, res) => {
    try {
        const { username, itemId } = req.body;

        if (!username || !itemId) {
            return res.status(400).json({ message: 'Username and item ID are required' });
        }

        // Find the cart item by username and itemId and remove it
        const result = await CartList.findOneAndDelete({ username, _id: itemId });

        if (result) {
            res.status(200).json({ message: 'Item removed from cart' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Failed to remove item from cart' });
    }
};

// Function to update an item in the cart
exports.updateCartItem = async (req, res) => {
    try {
        const { username, cartItem } = req.body;

        if (!username || !cartItem) {
            return res.status(400).json({ message: 'Username and cart item details are required' });
        }

        const result = await CartList.findOneAndUpdate(
            { username, productId: cartItem.productId },
            { $set: { ...cartItem, totalPrice: (cartItem.productPrice * cartItem.quantity).toFixed(2) } },
            { new: true }
        );

        if (result) {
            res.status(200).json({ message: 'Cart item updated successfully', cartItem: result });
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Failed to update cart item' });
    }
};
