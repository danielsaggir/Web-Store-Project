const SkiProducts = require('../models/SkiProducts');
const Clothes = require('../models/Clothes');
const Accessories = require('../models/Accessories');

exports.getProducts = async (req, res) => {
    const selectedCategory = req.query.category;
    const sortOption = req.query.sort;
    const colorFilters = req.query.color ? req.query.color.split(',') : []; // Convert to array if multiple
    const sizeFilters = req.query.size ? req.query.size.split(',') : [];   // Convert to array if multiple
    const priceFilter = req.query.price;  // Price range filter value
    const skiCategoryFilter = req.query.skiCategory ? req.query.skiCategory.split(',') : []; // Handle multiple categories

    let ProductModel;
    let filterCriteria = {};

    switch (selectedCategory) {
        case 'Ski Products':
            ProductModel = SkiProducts;
            if (colorFilters.length > 0) {
                filterCriteria.color = { $in: colorFilters };
            }
            if (skiCategoryFilter.length > 0) {
                filterCriteria.category = { $in: skiCategoryFilter }; // Match any of the selected subcategories
            }
            break;
        case 'Clothes':
            ProductModel = Clothes;
            if (colorFilters.length > 0) {
                filterCriteria.color = { $in: colorFilters };
            }
            if (sizeFilters.length > 0) {
                filterCriteria.$and = sizeFilters.map(size => {
                    switch (size.toLowerCase()) {
                        case 'small':
                            return { Small: { $gt: 0 } };
                        case 'medium':
                            return { Medium: { $gt: 0 } };
                        case 'large':
                            return { Large: { $gt: 0 } };
                        default:
                            return {};
                    }
                });
            }
            break;
        case 'Accessories':
            ProductModel = Accessories;
            if (colorFilters.length > 0) {
                filterCriteria.color = { $in: colorFilters };
            }
            if (sizeFilters.length > 0) {
                filterCriteria.$and = sizeFilters.map(size => {
                    switch (size.toLowerCase()) {
                        case 'small':
                            return { Small: { $gt: 0 } };
                        case 'medium':
                            return { Medium: { $gt: 0 } };
                        case 'large':
                            return { Large: { $gt: 0 } };
                        default:
                            return {};
                    }
                });
            }
            break;
        default:
            return res.status(400).send('Invalid category');
    }

    //Apply price filter if selected (All categories)
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
        }
    }

    //Apply sorting criteria
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
        const products = await ProductModel.find(filterCriteria).sort(sortCriteria).exec();
        res.render('products', { selectedCategory, products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


