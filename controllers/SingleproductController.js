const SkiProducts = require('../models/SkiProducts');
const Clothes = require('../models/Clothes');
const Accessories = require('../models/Accessories');

exports.getSingleProduct = async (req, res) => {
    const myId = parseInt(req.query.MyId); // Corrected to match the query parameter case
    const selectedCategory = req.query.selectedCategory; // Corrected to match the query parameter case

    // console.log(`Product MyId: ${myId}, Selected Category: ${selectedCategory}`);
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
        const product = await ProductModel.findOne({ MyId:myId });
        if (!product) {
            return res.status(404).send('Product not found');
        }

        console.log('Found product:', product); // Log the found product for verification

        res.render('SingleProduct', {
            product,
            selectedCategory // Pass selectedCategory to the view
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }
};
