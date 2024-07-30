const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// Route to create a new order
router.post('/createOrder', ordersController.createOrder);

// Add other necessary routes here
router.post('/emptyCart', ordersController.emptyCart); // Add this route if needed

module.exports = router;
