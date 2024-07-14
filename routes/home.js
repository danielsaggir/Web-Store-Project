// routes/home.js
const express = require('express');
const router = express.Router();
const path = require('path');

// Route for home
router.get('/', (req, res) => {
    const { username } = req.query;
    res.render('home', { username });
    // res.render('home');
});


module.exports = router;