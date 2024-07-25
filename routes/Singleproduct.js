const express = require('express');
const router = express.Router();
const singleProductController = require('../controllers/singleProductController');

// Route for single product
router.get('/singleProduct', singleProductController.getSingleProduct);

module.exports = router;
