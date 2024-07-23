const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productName: {
    type: String,
    required : true
    },
    productSize:{
        type : String,
        required: true 
    },
    productPrice: {
        type: Number,
        required : true
    },
    productImg: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required : true
    }
    });

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
