const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController'); // Path to controller
const CartList = require('../models/cartList'); // Import CartList model

// Handle POST requests for registration
router.post('/register', usersController.registerUser);

// Handle POST requests for login
router.post('/login', usersController.loginUser);

// Handle GET requests for logout
router.get('/logout', async (req, res) => {
    try {
        const username = req.session.username; // Retrieve the username from session
        
        // Clear the user's cart
        if (username) {
            await CartList.deleteMany({ username });
        }

        // Destroy the session
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send('Server error');
            }
            res.redirect('/'); // Redirect to homepage or login page
        });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).send('Server error');
    }
});

// Handle GET requests for deleting a user
router.get('/deleteUser', usersController.deleteUser);

// Handle POST requests for changing password
router.post('/changePass', usersController.changePassword);

// Handle POST requests for changing username
router.post('/changeUserName', usersController.changeUserName);

module.exports = router;
