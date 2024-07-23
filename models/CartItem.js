const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productName: String,
    productSize: String,
    productPrice: Number,
    productImg: String,
    userId: String
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
