const express = require('express');
const router = express.Router();
const singleProductController = require('../controllers/SingleproductController');

// Route for single product
router.get('/SingleProduct', singleProductController.getSingleProduct);

// Cart routes
router.get('/cart', singleProductController.getCart);
router.post('/add-to-cart', singleProductController.addToCart);

module.exports = router;
