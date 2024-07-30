// const Users = require('../models/users');
const Order = require('../models/orders'); // ייבוא המודל

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
