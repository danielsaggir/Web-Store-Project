const express = require('express');
const router = express.Router();
const SingleProductController = require('../controllers/SingleproductController');

router.get('/search', SingleProductController.searchProducts);

// Route for single product
router.get('/SingleProduct', SingleProductController.getSingleProduct);


// Route for checking size availability
router.post('/check-size', SingleProductController.checkSizeAvailability);


// Route for checkout
router.post('/checkout', SingleProductController.checkout);

module.exports = router;
