const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const userController = require('./controllers/usersController'); // עדכני בהתאם למיקום הקובץ

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
const singleProductRoutes = require('./routes/Singleproduct');
const managerRoutes = require('./routes/manager');
const userRoutes = require('./routes/users');
const accountRoutes = require('./routes/account');
// Use routes
server.use(homeRoutes);
server.use(productRoutes);
server.use(singleProductRoutes);
server.use(managerRoutes);
server.use(userRoutes);
server.use(accountRoutes);




server.post('/login',userController.loginUser);

server.post('/post-to-facebook', (req, res) => {
    if (!req.session.userAccessToken) {
        return res.status(401).send('User not logged in');
    }

    const userAccessToken = req.session.userAccessToken;
    const pageId = '380185848509976'; // הכניסי כאן את ה-Page ID שלך
    const message = req.body.message;

    // תחילה נקבל את ה-Page Access Token
    axios.get('https://graph.facebook.com/v12.0/me/accounts', {
        params: {
            access_token: userAccessToken
        }
    })
    .then(response => {
        if (response.data && response.data.data && response.data.data.length > 0) {
            const pages = response.data.data;
            const pageAccessToken = pages[0].access_token;

            // לאחר קבלת ה-Page Access Token, נבצע את קריאת ה-POST להעלאת הפוסט
            return axios.post(`https://graph.facebook.com/${pageId}/feed`, {
                message: message,
                access_token: pageAccessToken
            });
        } else {
            throw new Error('No pages found or insufficient permissions.');
        }
    })
    .then(response => {
        res.send(`Post successful: ${response.data}`);
    })
    .catch(error => {
        console.error('Error posting to Facebook:', error.response ? error.response.data : error.message);
        res.status(500).send('Error posting to Facebook.');
    });
});

// Start the server
const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// app.listen(80, () => {
//     console.log('Server is running on http://localhost');
// });


