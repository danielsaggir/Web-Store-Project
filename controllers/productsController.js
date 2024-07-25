const SkiProducts = require('../models/SkiProducts');
const Clothes = require('../models/Clothes');
const Accessories = require('../models/Accessories');

exports.getProducts = async (req, res) => {
    const selectedCategory = req.query.category;
    const sortOption = req.query.sort;
    const colorFilters = req.query.color ? req.query.color.split(',') : []; // Convert to array if multiple
    const sizeFilters = req.query.size ? req.query.size.split(',') : [];   // Convert to array if multiple
    const priceFilter = req.query.price;  // Price range filter value

    console.log('Selected Category:', selectedCategory);
    console.log('Sort Option:', sortOption);
    console.log('Color Filters:', colorFilters);
    console.log('Size Filters:', sizeFilters);
    console.log('Price Filter:', priceFilter);

    let ProductModel;
    let filterCriteria = {};

    switch (selectedCategory) {
        case 'Ski Products':
            ProductModel = SkiProducts;
            // Apply filters specific to Ski Products
            if (colorFilters.length > 0) {
                filterCriteria.color = { $in: colorFilters };
            }
            if (sizeFilters.length > 0) {
                filterCriteria.size = { $in: sizeFilters };
            }
            break;
        case 'Clothes':
            ProductModel = Clothes;
            // Apply filters specific to Clothes
            if (colorFilters.length > 0) {
                filterCriteria.color = { $in: colorFilters };
            }
            if (sizeFilters.length > 0) {
                const capitalizedSizeFilters = sizeFilters.map(size => size.charAt(0).toUpperCase() + size.slice(1).toLowerCase());
                filterCriteria.size = { $in: capitalizedSizeFilters };
            }
            break;
        case 'Accessories':
            ProductModel = Accessories;
            // Apply filters specific to Accessories
            if (colorFilters.length > 0) {
                filterCriteria.color = { $in: colorFilters };
            }
            break;
        default:
            return res.status(400).send('Invalid category');
    }

    // Apply price filter if selected (All categories)
    if (priceFilter) {
        switch (priceFilter) {
            case 'under300':
                filterCriteria.price = { $lt: 300 };
                break;
            case '300to800':
                filterCriteria.price = { $gte: 300, $lte: 800 };
                break;
            case '800andabove':
                filterCriteria.price = { $gte: 800 };
                break;
            case 'allprices':
                break;
        }
    }

  //Sorting by criteria
    let sortCriteria = {};
    switch (sortOption) {
        case 'price_asc':
            sortCriteria = { price: 1 };
            break;
        case 'price_desc':
            sortCriteria = { price: -1 };
            break;
        default:
            sortCriteria = {}; // Default sort is none
            break;
    }

    try {
        // Fetch products based on filter and sort criteria
        const products = await ProductModel.find(filterCriteria).sort(sortCriteria).exec();
        res.render('products', { selectedCategory, products }); // Render the products view with filtered products
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

