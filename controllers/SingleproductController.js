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

        res.render('Singelproduct', {
            product,
            selectedCategory // Pass selectedCategory to the view
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }
};
