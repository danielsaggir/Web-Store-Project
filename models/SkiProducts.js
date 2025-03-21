const mongoose = require('mongoose');

const skiSchema = new mongoose.Schema({
    MyId: {
        type: Number,
        required: true
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
    category: {
        type: String,
        enum: ['Snowboards', 'Poles', 'Boots', 'Masks'], // Restrict to these values
        required: true
    },
    color: {
        type: String,
        enum: ['Red', 'Black', 'White','Blue','Yellow','Green'],
        required: true
    },
    imageUrl: {
        type: String, // Array of strings for multiple images
        required: true
    },
});

const ski= mongoose.model('SkiProducts', skiSchema);

module.exports = ski;