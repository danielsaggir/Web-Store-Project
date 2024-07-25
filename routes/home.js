// routes/home.js
const express = require('express');
const router = express.Router();
const path = require('path');
const Branch = require('../models/Branch'); // עדכון הנתיב לפי התיקייה החדשה


// Route for home
router.get('/', (req, res) => {
    res.render('home');
});

// first option - may ignore this
// router.get('/', async (req, res) => {
//     const branches = await Branch.find({});
//     res.render('home', { branches });
// });

// API route for branches
router.get('/api/branches', async (req, res) => {
    try {
        const branches = await Branch.find({});
        res.json(branches);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch branches' });
    }
});

module.exports = router;