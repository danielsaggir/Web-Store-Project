const Users = require('../models/users');
// const bcrypt = require('bcrypt');  // need to check if we need this


// // פונקציה לטיפול בהרשמה

exports.registerUser = async (req, res) => {
    try {
        console.log('Register request received:', req.body);
        const { firstName, lastName, username, password } = req.body;

        if (!firstName || !lastName || !username || !password) {
            console.log('One or more fields are missing.');
            return res.status(400).send('All fields are required');
        }

        console.log('Checking for existing user with username:', username);
        const existingUser = await Users.findOne({ username });

        if (existingUser) {
            console.log('User already exists');
            return res.status(400).send('User already exists');
        }

        console.log('Creating new user');
                const newUser = new Users({ firstName, lastName, username, password });
                await newUser.save();

        console.log('New user created:', newUser);
        res.redirect(`/?username=${username}`);
    } catch (error) {
            console.error('Server error:', error);
            return res.status(500).send('Server error');
        }
    };

// פונקציה לטיפול בהתחברות

exports.loginUser = async (req, res) => {
    try {
        // הוספת שורת ניפוי שגיאות לבדיקת הבקשה
        console.log('Received login request:', req.body);

        const { username, password } = req.body || {};
        console.log('Received username:', username);
        console.log('Received password:', password);

        const user = await Users.findOne({ username });

        if (!user || user.password !== password) {
            console.log('Invalid credentials');
            return res.status(400).send('Invalid credentials');
        }

        console.log('Login successful');
        // res.redirect('/');
        res.redirect(`/?username=${username}`);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Server error');
    }
};


// פונקציה למחיקת משתמש
exports.deleteUser = async (req, res) => {
    try {
        const { username } = req.query;
        console.log('Delete user request received for username:', username);

        await Users.deleteOne({ username });

        console.log('User deleted:', username);
        res.redirect('/?username=Guest');
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).send('Server error');
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
