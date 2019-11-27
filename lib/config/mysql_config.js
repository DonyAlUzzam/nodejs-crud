'use strict';

let mysql = require('mysql');
let connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: '050617islam',
    database: 'crud_api',
});

connection.connect();

module.exports = connection;