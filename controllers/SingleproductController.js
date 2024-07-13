const SkiProducts = require('../models/SkiProducts');
const Clothes = require('../models/Clothes');
const Accessories = require('../models/Accessories');

exports.getSingleProduct = async (req, res) => {
    const myId = req.query.MyId; // Get MyId from query

    let ProductModel;

    // Determine the model based on the presence of MyId or any other logic you define
    // This is a placeholder logic; adjust based on your needs
    if (myId.startsWith('S')) {
        ProductModel = SkiProducts;
    } else if (myId.startsWith('C')) {
        ProductModel = Clothes;
    } else if (myId.startsWith('A')) {
        ProductModel = Accessories;
    } else {
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
