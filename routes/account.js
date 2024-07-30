const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController'); // ייבוא הקונטרולר הנכון

// נתיב להצגת דף הניהול
// router.get('/account', (req, res) => {
//     res.render('account');
// });
router.get('/account', accountController.account);

module.exports = router;