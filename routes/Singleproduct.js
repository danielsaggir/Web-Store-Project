const express = require('express');
const router = express.Router();
const singleProductController = require('../controllers/SingleproductController');

// Route for single product
router.get('/singleproduct', singleProductController.getSingleProduct);

module.exports = router;
