const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const server = express();

// Serve static files from the 'public' directory
server.use(express.static('public'));



// Set up a route to serve home.html when accessing '/'
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

server.listen(80, () => {
    console.log('Server is running on http://localhost');
});