// routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController'); // נתיב ל-controller

// טיפול בבקשות POST להרשמה
router.post('/register', usersController.registerUser);

// טיפול בבקשות POST להתחברות
router.post('/login', usersController.loginUser);

router.get('/logout', (req, res) => {
    res.redirect('/?username=Guest');
});

module.exports = router;
