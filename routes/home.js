// routes/home.js
const express = require('express');
const router = express.Router();
const path = require('path');
const Users = require('../models/users'); // Import the Users model
const Branch = require('../models/Branch'); // עדכון הנתיב לפי התיקייה החדשה


router.get('/', async (req, res) => {
    const username = req.session.username || 'Guest';
    const isAdmin = req.session.isAdmin || false;
    res.render('home', { username, isAdmin });
});

// Route for home
// router.get('/', (req, res) => {
//     const { username } = req.query;
//     res.render('home', { username });
//     // res.render('home');
// });

// router.get('/', async (req, res) => {
//     const { username } = req.query;
//     if (username) {
//         const user = await Users.findOne({ username });
//         if (user) {
//             return res.render('home', { username: user.username, isAdmin: user.isAdmin });
//         }
//     }
//     res.render('home', { username: 'Guest', isAdmin: false });
// });

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