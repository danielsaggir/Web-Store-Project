const SkiProducts = require('../models/SkiProducts');
const Clothes = require('../models/Clothes');
const Accessories = require('../models/Accessories');

let cart = [];

exports.getSingleProduct = async (req, res) => {
    const { name, MyId, selectedCategory } = req.query;

    let ProductModel;

    switch (selectedCategory) {
        case 'Ski Products':
            ProductModel = SkiProducts;
            break;
        case 'Clothes':
            ProductModel = Clothes;
            break;
        case 'Accessories':
            ProductModel = Accessories;
            break;
        default:
            ProductModel = SkiProducts; // Default model if selectedCategory is not provided
            break;
    }

    try {
        let product;
        if (name) {
            product = await ProductModel.findOne({ name: new RegExp(name, 'i') });
        } else if (MyId) {
            product = await ProductModel.findOne({ MyId: parseInt(MyId) });
        }

        if (!product) {
            return res.status(404).send('Product not found');
        }

        console.log('Found product:', product);

        res.render('SingleProduct', {
            product,
            selectedCategory // Pass selectedCategory to the view
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.checkSizeAvailability = async (req, res) => {
    const { productId, selectedSize, selectedCategory } = req.body;

    console.log('Checking size availability for product:', productId, 'with size:', selectedSize, 'in category:', selectedCategory); // לוג לבדיקה

    let ProductModel;

    switch (selectedCategory) {
        case 'Ski Products':
            ProductModel = SkiProducts;
            break;
        case 'Clothes':
            ProductModel = Clothes;
            break;
        case 'Accessories':
            ProductModel = Accessories;
            break;
        default:
            return res.status(400).send('Invalid category');
    }

    try {
        const product = await ProductModel.findOne({ MyId: parseInt(productId) });

        if (!product) {
            console.log('Product not found');
            return res.status(404).send('Product not found');
        }

        console.log('Product found:', product);

        if (product.size.includes(selectedSize)) {
            return res.json({ available: true });
        } else {
            return res.json({ available: false });
        }
    } catch (error) {
        console.error('Error checking size availability:', error);
        res.status(500).send('Internal Server Error');
    }
};



exports.getCart = (req, res) => {
    res.render('cart', { cart });
};

exports.addToCart = (req, res) => {
    const product = req.body;
    cart.push(product);
    res.json({ success: true });
};
