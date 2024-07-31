const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController'); // ייבוא הקונטרולר הנכון

// נתיב להצגת דף הניהול
// router.get('/account', (req, res) => {
//     res.render('account');
// });
router.get('/account', accountController.account);
router.delete('/delete/:id', accountController.deleteOrder);
module.exports = router;