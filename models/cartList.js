const mongoose = require('mongoose');

const cartListSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    productName: String,
    productDescription: String,
    productPrice: Number,
    productImage: String,
    selectedSize: String,
    quantity: Number,
    totalPrice: Number,
    category: String
});

const CartList = mongoose.model('CartList', cartListSchema); // Correct name

module.exports = CartList;