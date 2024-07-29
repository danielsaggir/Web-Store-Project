const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    MyId: {
        type : Number,
        required : true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: [String], // Array of strings for multiple images
        required: true
    },
    category: {
        type: String,
        enum: ['Helmets', 'Gloves', 'Goggles', 'Masks'], // Restrict to these values
        required: true
    },
    color: {
        type: String,
        enum: ['Red','Blue','Green', 'Black', 'White','Yellow'],
        required: true
    },
    Large: {
        type: Number,
        required: true
    },
    Medium: {
        type: Number,
        required: true
    },
    Small: {
        type: Number,
        required: true
    },
    imageUrl: {
        type : String,
        required : true
    },
    //     type: String, // Array of strings for multiple images
    //     required: true
    // },
    
});

const Product = mongoose.model('Accessories', productSchema);

module.exports = Product;