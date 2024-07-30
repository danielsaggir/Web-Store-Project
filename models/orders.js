const mongoose = require('mongoose');

// Define the schema
const orderSchema = new mongoose.Schema({
    username: { type: String, required: true },
    orderNumber: { type: String, unique: true, required: true },
    totalPrice: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    products: [{
        productName: String,
        productPrice: Number,
        quantity: Number,
        productImage: String,
        selectedSize: String
    }]
});

// Create the model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
