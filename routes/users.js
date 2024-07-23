// routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController'); // נתיב ל-controller

// טיפול בבקשות POST להרשמה
router.post('/register', usersController.registerUser);

// טיפול בבקשות POST להתחברות
router.post('/login', usersController.loginUser);

// router.get('/logout', (req, res) => {
//     res.redirect('/?username=Guest');
// });

router.get('/logout', usersController.logoutUser);
// req.session.destroy(err => {
//     if (err) {
//         return res.status(500).send('Server error');
//     }
//     res.redirect('/');
// });

router.get('/deleteUser', usersController.deleteUser);
// router.get('/deleteUser', usersController.isLoggedIn, usersController.deleteUser);


// טיפול בבקשות POST לשינוי סיסמא ושינוי שם משתמש
router.post('/changePass', usersController.changePassword);
router.post('/changeUserName', usersController.changeUserName);

module.exports = router;
