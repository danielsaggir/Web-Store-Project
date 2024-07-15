const express = require('express');
const router = express.Router();
const path = require('path');

// Route for manager page
router.get('/manager', (req, res) => {
    res.render('manager');
});

module.exports = router;
