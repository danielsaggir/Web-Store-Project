
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    productType: String,
    productName: String,
    productSize: String,
    productPrice: Number,
    productImg: String,
    myId: Number,
    quantity: Number,
    totalPrice: Number
});

const orderSchema = new mongoose.Schema({
    username: String,
    items: [orderItemSchema],
    totalAmount: Number,
    status: {
        type: String,
        default: 'Pending'
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;












// // const mongoose = require('mongoose');

// // const cartItemSchema = new mongoose.Schema({
// //     productName: String,
// //     productSize: String,
// //     productPrice: Number,
// //     productImg: String,
// //     quantity: Number
// // });

// // const cartSchema = new mongoose.Schema({
// //     username: { type: String, required: true },
// //     items: [cartItemSchema]
// // });

// // const Cart = mongoose.model('Cart', cartSchema);

// // module.exports = Cart;


// const mongoose = require('mongoose');

// const cartItemSchema = new mongoose.Schema({
//     productName: {
//     type: String,
//     required : true
//     },
//     productSize:{
//         type : String,
//         required: true 
//     },
//     productPrice: {
//         type: Number,
//         required : true
//     },
//     productImg: {
//         type: String,
//         required: true
//     },
//     username: {
//         type: String,
//         required : true
//     }
//     });

// const CartItem = mongoose.model('CartItem', cartItemSchema);

// module.exports = CartItem;
