const Order = require('../models/Order');
const Users = require('../models/users');
const SkiProducts = require('../models/SkiProducts');
const Clothes = require('../models/Clothes');
const Accessories = require('../models/Accessories');

exports.addToCart = async (req, res) => {
    try {
        const { productName, productSize, productPrice, productImg, username } = req.body;

        let productModel;
        let product = await SkiProducts.findOne({ name: productName });
        if (product) {
            productModel = SkiProducts;
        } else {
            product = await Clothes.findOne({ name: productName });
            if (product) {
                productModel = Clothes;
            } else {
                product = await Accessories.findOne({ name: productName });
                if (product) {
                    productModel = Accessories;
                } else {
                    return res.status(404).send('Product not found');
                }
            }
        }

        const existingOrder = await Order.findOne({ username, status: 'Pending' });

        const totalPrice = productPrice * 1; // חשב את המחיר הכולל

        if (existingOrder) {
            const existingItemIndex = existingOrder.items.findIndex(item => item.productName === productName && item.productSize === productSize);

            if (existingItemIndex > -1) {
                existingOrder.items[existingItemIndex].quantity += 1;
                existingOrder.items[existingItemIndex].totalPrice += totalPrice;
            } else {
                existingOrder.items.push({
                    productId: product._id,
                    productType: productModel.modelName,
                    productName,
                    productSize,
                    productPrice,
                    productImg,
                    myId: product.MyId,
                    quantity: 1,
                    totalPrice
                });
            }
            existingOrder.totalAmount += totalPrice;
            await existingOrder.save();
        } else {
            const newOrder = new Order({
                username,
                items: [{
                    productId: product._id,
                    productType: productModel.modelName,
                    productName,
                    productSize,
                    productPrice,
                    productImg,
                    myId: product.MyId,
                    quantity: 1,
                    totalPrice
                }],
                totalAmount: totalPrice
            });
            await newOrder.save();
        }

        res.status(200).send('Item added to cart');
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).send('Error adding item to cart');
    }
};

exports.getCart = async (req, res) => {
    try {
        const username = req.session.username;
        const existingOrder = await Order.findOne({ username, status: 'Pending' }).populate('items.productId');

        if (!existingOrder) {
            return res.status(200).json({ items: [], totalAmount: 0 });
        }

        res.status(200).json({
            items: existingOrder.items,
            totalAmount: existingOrder.totalAmount
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).send('Error fetching cart');
    }
};

exports.checkout = async (req, res) => {
    try {
        const username = req.session.username;
        const existingOrder = await Order.findOne({ username, status: 'Pending' });

        if (!existingOrder) {
            return res.status(400).send('No items in cart');
        }

        for (const item of existingOrder.items) {
            let productModel;
            switch (item.productType) {
                case 'SkiProducts':
                    productModel = SkiProducts;
                    break;
                case 'Clothes':
                    productModel = Clothes;
                    break;
                case 'Accessories':
                    productModel = Accessories;
                    break;
                default:
                    throw new Error('Invalid product type');
            }

            const product = await productModel.findById(item.productId);
            if (product) {
                product.quantity -= item.quantity;
                await product.save();
            }
        }

        existingOrder.status = 'Completed';
        await existingOrder.save();

        const user = await Users.findOne({ username });
        user.orders.push(existingOrder._id);
        await user.save();

        res.status(200).send('Order placed successfully');
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).send('Error during checkout');
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const username = req.session.username;
        const user = await Users.findOne({ username }).populate('orders');
        res.status(200).json(user.orders);
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).send('Error fetching user orders');
    }
};
