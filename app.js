const express= require('express')
const mongoose = require('mongoose');
const path = require('path');

const server= express()

server.use(express.static('public'))
//server.get('/', index.html)

// הגדרת חיבור למסד הנתונים MongoDB Atlas
const mongoURI = 'mongodb+srv://admin:admin@cluster0.hrynjzk.mongodb.net/mydb?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB Atlas...', err));


// connect to server
    server.listen(80, () => {
    console.log('Server is running on http://localhost');
});