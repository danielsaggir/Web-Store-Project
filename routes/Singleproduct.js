// routes/products.js
const express = require('express');
const router = express.Router();
const path = require('path');

// Route for products
router.get('/product', (req, res) => {
    res.render('Singleproducts');
});


module.exports = router;