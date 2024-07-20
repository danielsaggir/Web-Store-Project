// routes/home.js
const express = require('express');
const router = express.Router();
const path = require('path');
const Users = require('../models/users'); // Import the Users model

// Route for home
// router.get('/', (req, res) => {
//     const { username } = req.query;
//     res.render('home', { username });
//     // res.render('home');
// });

router.get('/', async (req, res) => {
    const { username } = req.query;
    if (username) {
        const user = await Users.findOne({ username });
        if (user) {
            return res.render('home', { username: user.username, isAdmin: user.isAdmin });
        }
    }
    res.render('home', { username: 'Guest', isAdmin: false });
});


module.exports = router;