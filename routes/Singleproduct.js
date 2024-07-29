const express = require('express');
const router = express.Router();
const SingleProductController = require('../controllers/SingleProductController');

// Route for single product
router.get('/SingleProduct', SingleProductController.getSingleProduct);

module.exports = router;
