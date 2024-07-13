const Users = require('../models/users');
const bcrypt = require('bcrypt');  // need to check if we need this

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await Users.findOne({ username });

        if (!user) {
            // User not found
            return res.status(404).send('User not found');
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            // Passwords don't match
            return res.status(401).send('Invalid password');
        }

        // Passwords match - login successful
        res.redirect('/'); // Redirect to home page or any desired page
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


