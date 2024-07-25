const SkiProducts = require('../models/SkiProducts');
const Clothes = require('../models/Clothes');
const Accessories = require('../models/Accessories');

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

exports.checkout = async (req, res) => {
    const { fullName, address, phone, email, items } = req.body;

    try {
        for (const item of items) {
            const { productName, quantity } = item;

            // Find the product in all categories and update the quantity
            let product = await SkiProducts.findOne({ name: productName });
            if (!product) {
                product = await Clothes.findOne({ name: productName });
            }
            if (!product) {
                product = await Accessories.findOne({ name: productName });
            }

            if (product) {
                if (product.quantity < quantity) {
                    return res.status(400).send(`Not enough stock for ${productName}`);
                }
                product.quantity -= quantity;
                await product.save();
            } else {
                return res.status(404).send(`Product ${productName} not found`);
            }
        }

        // Here you can add logic to save the order details and customer information if needed
        console.log('Customer Information:', { fullName, address, phone, email });

        res.json({ success: true });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).send('Internal Server Error');
    }
};
