const mongoose = require('mongoose');

const ClothesSchema = new mongoose.Schema({
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
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Shirts', 'Jackets', 'Pants', 'Socks', 'Underwear','Facemasks','Hats'], // Restrict to these values
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
        type: String, // Array of strings for multiple images
        required: true
    },
});

const Clothes = mongoose.model('Clothes', ClothesSchema);

module.exports = Clothes;