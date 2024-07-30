const express = require('express');
const router = express.Router();
const SingleProductController = require('../controllers/SingleProductController');

// Route for single product
router.get('/SingleProduct', singleProductController.getSingleProduct);

// // Cart routes
// router.get('/cart', singleProductController.getCart);
// router.post('/add-to-cart', singleProductController.addToCart);

// Route for checking size availability
router.post('/check-size', singleProductController.checkSizeAvailability);


// Route for checkout
router.post('/checkout', singleProductController.checkout);

module.exports = router;
