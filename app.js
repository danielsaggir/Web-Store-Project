const express = require('express');
const mongoose = require('mongoose');
const path = require('path');



const Accessories = require('./models/Accessories');
const Clothes = require('./models/Clothes');
const SkiProducts = require('./models/SkiProducts');
const Users = require('./models/users');

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

// Middleware to parse JSON bodies
server.use(express.json());

// Import routes
const homeRoutes = require('./routes/home');
const productRoutes = require('./routes/products');
const SingleProductRoutes = require('./routes/SingleProduct');
const managerRoutes = require('./routes/manager');
// Use routes
server.use(homeRoutes);
server.use(productRoutes);
server.use(SingleProductRoutes);
server.use(managerRoutes);


// Start the server
const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// app.listen(80, () => {
//     console.log('Server is running on http://localhost');
// });


