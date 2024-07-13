// routes/home.js
const express = require('express');
const router = express.Router();
const path = require('path');

// Route for home
router.get('/', (req, res) => {
    res.render('home');
});

// const UserController = require('../controllers/usersController');

// // כאן יבוצע הראוטינג של הגישה השונה
// router.post('/login', usersController.login);
// router.post('/register', usersController.register);


module.exports = router;