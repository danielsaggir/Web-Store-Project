// routes/home.js
const express = require('express');
const router = express.Router();
const path = require('path');

// Route for home
router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;