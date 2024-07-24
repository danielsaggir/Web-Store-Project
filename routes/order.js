const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isLoggedIn } = require('../controllers/usersController');

router.post('/add-to-cart', isLoggedIn, orderController.addToCart);
router.post('/checkout', isLoggedIn, orderController.checkout);
router.get('/user-orders', isLoggedIn, orderController.getUserOrders);
// router.get('/cart', isLoggedIn, orderController.getCart);

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const CartItem = require('../models/Order');

// module.exports = router;
