const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up a route to serve home.html when accessing '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// app.get('/products', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'products.html'));
// });

// app.get('/product', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'product.html'));
// });

app.listen(80, () => {
    console.log('Server is running on http://localhost');
});