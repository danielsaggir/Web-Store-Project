const Users = require('../models/users');
// const bcrypt = require('bcrypt');  // need to check if we need this


// // פונקציה לטיפול בהרשמה

exports.registerUser = async (req, res) => {
    try {
        console.log('Register request received:', req.body);
        const { firstName, lastName, username, password } = req.body;

        if (!firstName || !lastName || !username || !password) {
            console.log('One or more fields are missing.');
            // return res.status(400).send('All fields are required');
            return res.status(400).json({ error: 'All fields are required' });
        }

        console.log('Checking for existing user with username:', username);
        const existingUser = await Users.findOne({ username });

        if (existingUser) {
            console.log('User already exists');
            return res.status(400).json({ error: 'User already exists' });
            // return res.status(400).send('User already exists');
        }

        console.log('Creating new user');
                const newUser = new Users({ firstName, lastName, username, password });
                await newUser.save();

        console.log('New user created:', newUser);
        req.session.username = newUser.username;
        req.session.isAdmin = newUser.isAdmin;
        res.redirect(`/?username=${username}`);
        // res.render('home', { username: newUser.username, isAdmin: newUser.isAdmin });
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

        if (!user) {
            console.log('Wrong User Name');
            return res.status(400).json({ error: 'Wrong User Name' });
            // return res.status(400).send('Invalid credentials');
        }

        if (user.password !== password) {
            console.log('Wrong Password');
            return res.status(400).json({ error: 'Wrong Password' });
            // return res.status(400).send('Invalid credentials');
        }

        console.log('Login successful');
        // res.redirect('/');
        req.session.username = user.username;
        req.session.isAdmin = user.isAdmin;
        res.redirect(`/?username=${username}`);
        // res.render('home', { username: user.username, isAdmin: user.isAdmin });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Server error');
    }
};
exports.logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.redirect('/');
    });
};

// פונקציה למחיקת משתמש
exports.deleteUser = async (req, res) => {
    try {
        const { username } = req.query;
        console.log('Delete user request received for username:', username);

        await Users.deleteOne({ username });

        console.log('User deleted:', username);
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send('Server error');
            }
            res.redirect('/?username=Guest');
        });
        // res.redirect('/?username=Guest');
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).send('Server error');
    }
};



// פונקציה לשינוי סיסמא
exports.changePassword = async (req, res) => {
    try {
        const { username, newPassword } = req.body;
        console.log('Change password request received for username:', username);

        const existingPassword = await Users.findOne({ password: newPassword });
        if (existingPassword) {
            console.log('Password already exists');
            return res.status(400).json({ error: 'Password already exists' });
        }

        await Users.updateOne({ username }, { password: newPassword });

        console.log('Password updated for user:', username);
        res.redirect(`/?username=${username}`);
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).send('Server error');
    }
};

// פונקציה לשינוי שם משתמש
exports.changeUserName = async (req, res) => {
    try {
        const { username, newUserName } = req.body;
        console.log('Change user name request received for username:', username);

        const existingUser = await Users.findOne({ username: newUserName });
        if (existingUser) {
            console.log('User name already exists');
            return res.status(400).json({ error: 'User name already exists' });
        }

        await Users.updateOne({ username }, { username: newUserName });

        req.session.username = newUserName; // עדכון שם המשתמש בסשן
        console.log('User name updated from:', username, 'to:', newUserName);
        res.redirect(`/?username=${newUserName}`);
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
