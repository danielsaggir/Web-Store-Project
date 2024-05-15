const express= require('express')

const server= express()

server.use(express.static('public'))
//server.get('/', index.html)

server.listen(80, () => {
    console.log('Server is running on http://localhost');
});