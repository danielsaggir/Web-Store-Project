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
