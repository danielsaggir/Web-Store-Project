const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

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

//added this  //middleware settings
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());
server.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // במצב ייצור יש לשנות ל-true
}));

// Serve static files from the 'public' directory
server.use(express.static('public'));

// Set the view engine to EJS
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON bodies
server.use(express.json());


// Middleware to attach user info to response locals
server.use((req, res, next) => {
    res.locals.username = req.session.username;
    res.locals.isAdmin = req.session.isAdmin;
    next();
});

// Import routes
const homeRoutes = require('./routes/home');
const productRoutes = require('./routes/products');
const SingleproductRoutes = require('./routes/Singleproduct');
const userRoutes = require('./routes/users'); // 
const managerRoutes = require('./routes/manager');
const accountRoutes = require('./routes/account');
// Use routes
server.use(homeRoutes);
server.use(productRoutes);
server.use(SingleproductRoutes);
server.use(userRoutes);
server.use(managerRoutes);
server.use(accountRoutes);


// Start the server
const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// app.listen(80, () => {
//     console.log('Server is running on http://localhost');
// });


