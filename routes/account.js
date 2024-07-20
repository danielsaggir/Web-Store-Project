const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');

// נתיב להצגת דף הניהול
router.get('/account', (req, res) => {
    res.render('account');
});

module.exports = router;