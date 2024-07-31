// // routes/products.js
// const express = require('express');
// const router = express.Router();
// const productsController = require('../controllers/productsController');

// router.get('/products', productsController.getProducts);

// module.exports = router;

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');

router.get('/products', productController.getProducts);

module.exports = router;