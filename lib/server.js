'use strict';

let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let cors = require('cors');

const mongoose = require("mongoose");
const passport = require("passport");

let employeeController = require('./controllers/employee_controller');
let loginController = require('./controllers/login_controller');
let controller = require('./controllers/controller')

let app = express();
let jwt = require('jsonwebtoken');
let verify = require('./config/verifyToken');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors());

app.get('/', (req, res, next)=>{
    res.send('helloooo world');
});

app.post('/employees', verify, controller.createEmployee);
app.put('/employees/:code', verify, employeeController.updateEmployee);
app.delete('/employees/:code', verify, employeeController.deleteEmployee);
app.get('/employees/:code', verify, employeeController.getEmployee);
app.get('/employees', verify, employeeController.getEmployees)
app.post('/auth', loginController.SingIn)
app.post('/auth/register', loginController.Register)
app.post('/auth/logout', loginController.Logout)
app.get('/api', (req, res)=> {
    res.json({
        message: 'welcome to the API'
    });
});

app.get('/users', controller.index);
app.get('/users/tes', verify, controller.employees);
app.get('/users/:code', verify, controller.findEmployee);
app.post('/users/posts', verify, controller.createEmployee);
app.patch('/users/update/:code', verify, controller.updateEmployee);
app.delete('/users/delete/:code', verify, controller.deleteEmployee);
app.patch('/users/update/:code', verify, controller.updateDataEmployee);

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

//Format Token
//Authorization: bearer <access_token>




module.exports = app;