const express = require('express');
const router = express.Router();
const SingleProductController = require('../controllers/SingleproductController');

// Route for single product
router.get('/SingleProduct', SingleProductController.getSingleProduct);

// // Cart routes
// router.get('/cart', singleProductController.getCart);
// router.post('/add-to-cart', singleProductController.addToCart);

// Route for checking size availability
router.post('/check-size', SingleProductController.checkSizeAvailability);


// Route for checkout
router.post('/checkout', SingleProductController.checkout);

module.exports = router;
