// // routes/products.js
// const express = require('express');
// const router = express.Router();
// const productsController = require('../controllers/productsController');

// router.get('/products', productsController.getProducts);

// module.exports = router;

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');
const Product = require('../models/Accessories'); // Adjust path as needed
const Clothes = require('../models/Clothes'); // Adjust path as needed
const Ski = require('../models/SkiProducts'); // Adjust path as needed

router.get('/products', productController.getProducts);
// Check availability of a product
router.post('/checkAvailability', async (req, res) => {
    const { productId, quantity, size } = req.body;

    try {
        const product = await Product.findOne({ MyId: productId }) || 
                        await Clothes.findOne({ MyId: productId }) || 
                        await Ski.findOne({ MyId: productId });

        if (!product) {
            return res.status(404).json({ available: false });
        }

        let available = false;
        if (product.category === 'Snowboards' || product.category === 'Poles' || product.category === 'Boots' || product.category === 'Masks') {
            available = product.quantity >= quantity;
        } else if (product.category === 'Helmets' || product.category === 'Gloves' || product.category === 'Goggles' || product.category === 'Masks') {
            available = (product[size] || 0) >= quantity;
        } else {
            available = (product[size] || 0) >= quantity;
        }

        res.json({ available });
    } catch (error) {
        console.error('Error checking availability:', error);
        res.status(500).json({ available: false });
    }
});

module.exports = router;