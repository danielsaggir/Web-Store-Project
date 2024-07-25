const express = require('express');
const router = express.Router();
const singleProductController = require('../controllers/singleProductController');

// Route for single product
router.get('/singleProduct', singleProductController.getSingleProduct);

// Cart routes
router.get('/cart', singleProductController.getCart);
router.post('/add-to-cart', singleProductController.addToCart);

module.exports = router;
