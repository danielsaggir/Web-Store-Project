// console.log("Product controller loaded");

// exports.getProducts = (req, res) => {
//     const category = req.query.category;
//     res.render('products', { category });
// };


// const Product = require('../models/Product');

// console.log("Product controller loaded");

// exports.getProducts = async (req, res) => {
//     const category = req.query.category;

//     try {
//         const products = await Product.find({ category });
//         res.render('products', { category, products });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// };


const SkiProducts = require('../models/SkiProducts');
const Clothes = require('../models/Clothes');
const Accessories = require('../models/Accessories');

console.log("Product controller loaded");

exports.getProducts = async (req, res) => {
    const category = req.query.category;
    let ProductModel;

    switch (category) {
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
        const products = await ProductModel.find();
        res.render('products', { category, products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
