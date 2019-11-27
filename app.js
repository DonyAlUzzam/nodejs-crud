'use strict';

let http = require('http');
let server = require('./lib/server');


const PORT = process.env.port || 9000;

server.set('port', PORT);
let app = http.createServer(server);

app.listen(PORT, () => {
    console.log('Aplikasi sudah berjalan...');
});

// const express = require('express');
// const jwt = require('jsonwebtoken');

// const app = express();

// app.get('/api', (req, res)=> {
//     res.json({
//         message: 'welcome to the API'
//     });
// });

// app.post('/api/posts', verifyToken, (req, res) => {
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if(err){
//             res.sendStatus(403)
//         } else {
//             res.json({
//                 message: 'Post created',
//                 authData
//             });
//         }
//     })
// });

// app.post('/api/login', (req, res) => {
//    const user = {
//        id: 1,
//        username: 'dony',
//        email: 'doni@gmail.com'
//    }
//    jwt.sign({user: user}, 'secretkey', (err, token) => {
//     res.json({
//         token
//     })
//    })
// });

// //Format Token
// //Authorization: bearer <access_token>

// function verifyToken(req, res, next){
//     const bearerHeader = req.headers['authorization'];
    
//     if(typeof bearerHeader !== 'undefined'){
//         const bearer = bearerHeader.split(' ');
//         const bearerToken = bearer[1];
//         req.token = bearerToken;
//         next();
//     } else {
//         //forbidden
//         res.sendStatus(403)
//     }
// }

// app.listen(9000, () => console.log('server started on port 9000'));