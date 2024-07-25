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
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // image: {
    //     type: [String], // Array of strings for multiple images
    //     required: true
    // },
    gender: {
        type: String,
        enum: ['Men', 'Women', 'Unisex'],
        required: true
    },

    category: {
        type: String,
        enum: ['Helmets', 'Gloves', 'Goggles', 'Masks'], // Restrict to these values
        required: true
    },
    color: {
        type: String,
        enum: ['Red', 'Black', 'White','Blue','Yellow'],
        required: true
    },
    size: {
        type: String,
        enum: ['Small', 'Medium', 'Large','X-Large','XX-Large', 'One Size'],
        required: true
    },
    imageUrl: {
        type : String,
        required : true
    },
});

const Product = mongoose.model('Accessories', productSchema);

module.exports = Product;