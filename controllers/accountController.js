// const Users = require('../models/users');
const Order = require('../models/orders'); // ייבוא המודל
const SkiProducts = require('../models/SkiProducts');
const Clothes = require('../models/Clothes');
const Accessories = require('../models/Accessories');


// פונקציה להצגת העמוד האזור האישי
exports.account = async (req, res) => {
    try {
        const username = req.session.username; // או מאיזה מקור שאתה משתמש עבור שם המשתמש

        // חיפוש כל ההזמנות של המשתמש
        const orders = await Order.find({ username: username }).exec();

        // שליחה לתצוגה
        res.render('account', { orders: orders, username: username });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).send("Internal Server Error");
    }
};


// New function to handle order deletion
exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).exec();

        if (!order) {
            return res.status(404).send("Order not found");
        }

        console.log("Order found:", order);

        // פונקציה לעדכון כמות המוצר בקולקציה המתאימה
        const updateProductQuantity = async (Model, productName, sizeField, quantity) => {
            const update = {};
            update[sizeField] = quantity;

            await Model.findOneAndUpdate(
                { name: productName },
                { $inc: update }
            );
        };

        // עדכון הכמויות של המוצרים
        for (const product of order.products) {
            const { productName, selectedSize, quantity } = product;

            console.log("Product name:", productName);
            console.log("Selected size:", selectedSize);
            console.log("Quantity:", quantity);

            let productModel = null;

            // חיפוש המוצר במודל הנכון
            productModel = await SkiProducts.findOne({ name: productName }).exec();
            if (productModel) {
                await updateProductQuantity(SkiProducts, productName, 'quantity', quantity);
                continue;
            }

            productModel = await Clothes.findOne({ name: productName }).exec();
            if (productModel) {
                if (selectedSize) {
                    await updateProductQuantity(Clothes, productName, selectedSize, quantity);
                } else {
                    console.error('Size not specified for clothes');
                }
                continue;
            }

            productModel = await Accessories.findOne({ name: productName }).exec();
            if (productModel) {
                if (selectedSize) {
                    await updateProductQuantity(Accessories, productName, selectedSize, quantity);
                } else {
                    console.error('Size not specified for accessories');
                }
                continue;
            }

            if (!productModel) {
                console.error('Unknown product:', productName);
            }
        }

        // מחיקת ההזמנה מאוסף ההזמנות
        await Order.findByIdAndDelete(orderId);

        console.log('Success delete');

        res.status(200).send('Order deleted successfully');
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).send("Internal Server Error");
    }
};



// exports.deleteOrder = async (req, res) => {
//     try {
//         const orderId = req.params.id;
//         const order = await Order.findById(orderId).exec();

//         if (!order) {
//             return res.status(404).send("Order not found");
//         }

//          // עדכון הכמויות של המוצרים
//          for (const product of order.products) {
//             const { productName } = product;

//             // פונקציה לעדכון כמות המוצר בקולקציה המתאימה
//             const updateProduct = async (Model) => {
//                 await Model.findOneAndUpdate(
//                     { name: productName },
//                     { $inc: { quantity: 1 } }
//                 );
//             };

//             // קריאה לפונקציה לפי הקטגוריה של המוצר
//             switch (order.category) {
//                 case 'Ski Products':
//                     await updateProduct(SkiProducts);
//                     break;
//                 case 'Clothes':
//                     await updateProduct(Clothes);
//                     break;
//                 case 'Accessories':
//                     await updateProduct(Accessories);
//                     break;
//                 default:
//                     console.error('Unknown category');
//             }
//         }

//         // מחיקת ההזמנה מאוסף ההזמנות
//         await Order.findByIdAndDelete(orderId);


//         res.status(200).send('Order deleted successfully');
//     } catch (error) {
//         console.error("Error deleting order:", error);
//         res.status(500).send("Internal Server Error");
//     }
// };
