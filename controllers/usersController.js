const Users = require('../models/users');
// const bcrypt = require('bcrypt');  // need to check if we need this


// פונקציה לטיפול בהרשמה
exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, username, password } = req.body;
        const existingUser = await Users.findOne({ username });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({ firstName, lastName, username, password: hashedPassword });
        await newUser.save();
        res.redirect('/'); // הפניה חזרה לעמוד הבית לאחר הרשמה מוצלחת
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// פונקציה לטיפול בהתחברות
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(400).send('Invalid credentials');
        }
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Server error');
    }
};





// // פונקציה לטיפול בהרשמה
// exports.registerUser = async (req, res) => {
//     try {
//         const { firstName, lastName, username, password } = req.body;
//         const existingUser = await Users.findOne({ username });
//         if (existingUser) {
//             return res.status(400).send('User already exists');
//         }
//         const newUser = new Users({ firstName, lastName, username, password });
//         await newUser.save();
//         res.redirect('/'); // הפניה חזרה לעמוד הבית לאחר הרשמה מוצלחת
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// };

// // פונקציה לטיפול בהתחברות
// exports.loginUser = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await Users.findOne({ username });
//         if (!user || user.password !== password) {
//             return res.status(400).send('Invalid credentials');
//         }
//         // התחברות מוצלחת
//         res.redirect('/'); // הפניה לעמוד הבית
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// };