const Order = require('../models/orders');
const CartItem = require('../models/cartList');
const SkiProduct = require('../models/SkiProducts');
const Accessories = require('../models/Accessories');
const Clothes = require('../models/Clothes');

exports.createOrder = async (req, res) => {
    try {
        const { username, orderNumber, totalPrice, products } = req.body;

        // Create new order document
        const newOrder = new Order({
            username,
            orderNumber,
            totalPrice,
            date: new Date(),
            products
        });

        await newOrder.save();

        // Remove items from cart and update product quantities
        for (const item of products) {
            await CartItem.deleteOne({ username, productId: item.productId, selectedSize: item.selectedSize });

            
            let product;
            console.log(`item is:${JSON.stringify(item)}`);
            switch (item.category) {
                case 'Ski Products':
                    product = await SkiProduct.findOne({ name:item.productName });
                    console.log(`product skiprod is:${JSON.stringify(product)}`);
                    if (product) {
                        console.log(`product is:${JSON.stringify(product)}`);
                        console.log(`item is:${JSON.stringify(item)}`);
                        product.quantity -= item.quantity;
                        await product.save();
                    }
                    break;
                case 'Accessories':
                    product = await Accessories.findOne({ name:item.productName });
                    console.log(`product accessories is:${JSON.stringify(product)}`);
                    if (product) {
                        product[item.selectedSize] -= item.quantity;
                        await product.save();
                    }
                    break;
                case 'Clothes':
                    product = await Clothes.findOne({ name:item.productName });
                    console.log(`product clothes is:${JSON.stringify(product)}`);
                    if (product) {
                        product[item.selectedSize] -= item.quantity;
                        await product.save();
                    }
                    break;
                default:
                    console.error('Unknown category:', item.category);
                    break;
            }
        }

        // Optionally, empty the cart after order creation
        // await CartItem.deleteMany({ username });

        res.status(200).json({ message: 'Order placed successfully' });
    } catch (error) {
        console.error('Failed to create order:', error);
        res.status(500).json({ message: 'Failed to create order' });
    }
};

// Add this function if you need to empty the cart
exports.emptyCart = async (req, res) => {
    const { username } = req.body;

    try {
        await CartItem.deleteMany({ username });
        res.status(200).json({ message: 'Cart emptied successfully' });
    } catch (error) {
        console.error('Error emptying cart:', error);
        res.status(500).json({ message: 'Failed to empty cart' });
    }
};
