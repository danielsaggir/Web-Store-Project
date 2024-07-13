const SkiProducts = require('../models/SkiProducts');
const Clothes = require('../models/Clothes');
const Accessories = require('../models/Accessories');

exports.getSingleProduct = async (req, res) => {
    const myId = req.query.MyId; // Get MyId from query
    const selectedCategory = req.query.selectedCategory; // Get selectedCategory from query

    console.log(`Product MyId: ${myId}, Selected Category: ${selectedCategory}`);

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
        const product = await ProductModel.findOne({ MyId: myId });
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('singleproduct', { product });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};