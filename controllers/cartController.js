const CartList = require('../models/cartList');
const Product = require('../models/Accessories'); // Adjust path as needed
const Clothes = require('../models/Clothes'); // Adjust path as needed
const Ski = require('../models/SkiProducts'); // Adjust path as needed

// Function to add an item to the cart
exports.addCartItem = async (req, res) => {
    try {
        const { username, cartItem } = req.body;

        // Check if all required fields are provided
        if (!username || !cartItem) {
            return res.status(400).json({ message: 'Username and cart item details are required' });
        }

        // Check if the item already exists in the cart
        const existingItem = await CartList.findOne({ username, productName: cartItem.productName, selectedSize: cartItem.selectedSize });

        if (existingItem) {
            // Item exists; no need to change cart display, only update the quantity
            existingItem.quantity += cartItem.quantity;
            existingItem.totalPrice = (existingItem.productPrice * existingItem.quantity).toFixed(2);

            await existingItem.save();
            updateCartDisplay();
            return res.status(200).json({ message: 'Cart item quantity updated successfully' });
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
            { username, productId: cartItem.productId, selectedSize: cartItem.selectedSize },
            { $set: { quantity: cartItem.quantity, totalPrice: (cartItem.productPrice * cartItem.quantity).toFixed(2) } },
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

// Check availability of a item
exports.checkAvailability = async (req, res) => {
    const { productName, quantity, size } = req.body;

    try {
        const product = await Product.findOne({ name: productName }) || 
                        await Clothes.findOne({ name: productName }) || 
                        await Ski.findOne({ name: productName });

        if (!product) {
            return res.status(404).json({ available: false });
        }

        let available = false;
        if (product.category === 'Snowboards' || product.category === 'Poles' || product.category === 'Boots' || product.category === 'Masks') {
            available = product.quantity >= quantity;
        } else if (product.category === 'Helmets' || product.category === 'Gloves' || product.category === 'Goggles' || product.category === 'Masks') {
            available = (product[size] || 0) >= quantity;
        } else {
            available = (product[size] || 0) >= quantity;
        }

        res.json({ available });
    } catch (error) {
        console.error('Error checking availability:', error);
        res.status(500).json({ available: false });
    }
};
