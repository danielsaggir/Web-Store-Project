const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const Accessories = require('./models/Accessories');
const Clothes = require('./models/Clothes');
const SkiProducts = require('./models/SkiProducts');

const server = express();

// Serve static files from the 'public' directory
server.use(express.static('public'));

// הגדרת חיבור למסד הנתונים MongoDB Atlas
const mongoURI = 'mongodb+srv://admin:admin@cluster0.hrynjzk.mongodb.net/';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB Atlas...', err));


// Set up a route to serve home.html when accessing '/'
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
server.listen(80, () => {
    console.log('Server is running on http://localhost')});

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`);
// });