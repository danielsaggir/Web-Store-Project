const SkiProducts = require('../models/SkiProducts');
const Clothes = require('../models/Clothes');
const Accessories = require('../models/Accessories');
// const Users = require('../models/Users');

exports.getSkiProducts = async (req, res) => {
    try {
        const skiProducts = await SkiProducts.find();
        res.json(skiProducts);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getClothes = async (req, res) => {
    try {
        const clothes = await Clothes.find();
        res.json(clothes);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getAccessories = async (req, res) => {
    try {
        const accessories = await Accessories.find();
        res.json(accessories);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedData = req.body;

        console.log('Received data for update:', updatedData); // הדפסת הנתונים שהתקבלו
        console.log('Updating product with MyId:', productId); // הדפסת ה-ID של המוצר

        let updatedProduct;
        if (updatedData.quantity !== undefined) {
            updatedProduct = await SkiProducts.findOneAndUpdate({ MyId: productId }, updatedData, { new: true });
        } else if (updatedData.Large !== undefined || updatedData.Medium !== undefined || updatedData.Small !== undefined) {
            updatedProduct = await Clothes.findOneAndUpdate({ MyId: productId }, updatedData, { new: true });
            if (!updatedProduct) {
                updatedProduct = await Accessories.findOneAndUpdate({ MyId: productId }, updatedData, { new: true });
            }
        }

        res.json(updatedProduct);
    } catch (err) {
        console.error('Error updating product:', err); // הדפסת השגיאה
        res.status(500).send(err);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await SkiProducts.findOneAndDelete({ MyId: productId }) ||
                               await Clothes.findOneAndDelete({ MyId: productId }) ||
                               await Accessories.findOneAndDelete({ MyId: productId });
        res.json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.uploadProduct = async (req, res) => {
    try {
        const model = req.params.model;
        let ProductModel;

        switch (model) {
            case 'ski-products':
                ProductModel = SkiProducts;
                break;
            case 'clothes':
                ProductModel = Clothes;
                break;
            case 'accessories':
                ProductModel = Accessories;
                break;
            default:
                return res.status(400).send({ error: 'Invalid model type' });
        }

        const newProduct = new ProductModel(req.body);
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.searchProduct = async (req, res) => {
    try {
        const { model, query } = req.query;
        console.log(`Search query: ${query}, Model: ${model}`); // הודעת הדפסה לבדיקה

        let ProductModel;

        switch (model) {
            case 'ski-products':
                ProductModel = SkiProducts;
                break;
            case 'clothes':
                ProductModel = Clothes;
                break;
            case 'accessories':
                ProductModel = Accessories;
                break;
            default:
                return res.status(400).send({ error: 'Invalid model type' });
        }

        const searchItem = { $or: [{ name: new RegExp(query, 'i') }, { MyId: parseInt(query) }] };
        const products = await ProductModel.find(searchItem);

        console.log('Found products:', products); // הודעת הדפסה לבדיקה

        res.json(products);
    } catch (err) {
        console.error('Error searching products:', err); // הודעת הדפסה במקרה של שגיאה
        res.status(500).send(err);
    }
};
