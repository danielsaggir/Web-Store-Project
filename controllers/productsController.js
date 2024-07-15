const SkiProducts = require('../models/SkiProducts');
const Clothes = require('../models/Clothes');
const Accessories = require('../models/Accessories');



// exports.getProducts = async (req, res) => {
//     const selectedCategory = req.query.category; // Renamed to selectedCategory to avoid confusion
//     console.log('Selected Category:', selectedCategory);

//     let ProductModel;

//     switch (selectedCategory) {
//         case 'Ski Products':
//             ProductModel = SkiProducts;
//             break;
//         case 'Clothes':
//             ProductModel = Clothes;
//             break;
//         case 'Accessories':
//             ProductModel = Accessories;
//             break;
//         default:
//             return res.status(400).send('Invalid category');
//     }

//     try {
//         const products = await ProductModel.find();
//         res.render('products', { selectedCategory, products }); // Pass selectedCategory to the view
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// };


exports.getProducts = async (req, res) => {
    const selectedCategory = req.query.category;
    const sortOption = req.query.sort;

    console.log('Selected Category:', selectedCategory);
    console.log('Sort Option:', sortOption);

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

    let sortCriteria = {};
    switch (sortOption) {
        case 'price_asc':
            sortCriteria = { price: 1 };
            break;
        case 'price_desc':
            sortCriteria = { price: -1 };
            break;
        //Here you can add another sort option
        default:
            sortCriteria = {}; //Default sort is == non sorted
            break;
    }

    try {
        const products = await ProductModel.find().sort(sortCriteria).exec();
        res.render('products', { selectedCategory, products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
