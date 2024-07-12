// routes/products.js
const express = require('express');
const router = express.Router();
const path = require('path');

// Route for products
router.get('/products', (req, res) => {
    res.render('products');
});


module.exports = router;