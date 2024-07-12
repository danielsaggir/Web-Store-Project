const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const Accessories = require('./models/Accessories');
const Clothes = require('./models/Clothes');
const SkiProducts = require('./models/SkiProducts');

// MongoDB Atlas
const mongoURI = 'mongodb+srv://admin:admin@cluster0.hrynjzk.mongodb.net/';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB Atlas...', err));



const server = express();

// Serve static files from the 'public' directory
server.use(express.static('public'));

// Set the view engine to EJS
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));


// Set up a route to serve home.html when accessing '/'
server.get('/', (req, res) => {
    res.render('home'); // home.ejs
});

// Set up a route to serve products.html when accessing '/products'
server.get('/products', (req, res) => {
    res.render('products'); // products.ejs
});

// Set up a route to serve product.html when accessing '/product'
server.get('/product', (req, res) => {
    res.render('Singelproduct'); // Singelproduct.ejs
});


// Start the server
const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// app.listen(80, () => {
//     console.log('Server is running on http://localhost');
// });

