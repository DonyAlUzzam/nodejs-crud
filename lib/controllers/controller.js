'use strict';

const response = require('../response/res');
const db = require('../config/mysql_config');

exports.employees = function(req, res){
    db.query('SELECT * FROM employee', function(err, rows, fields){
        if(err){
            console.log(err)
        } else {
            response.ok(rows, res)
        }
    });
};

exports.index = function(req, res){
    response.ok("Hello", res)
};

exports.findEmployee = function(req, res){
    const user_code = req.params.code;

    db.query('SELECT employee.*, data_employee.alamat, data_employee.umur, data_employee.status FROM employee JOIN data_employee ON employee.code = data_employee.employee_id WHERE employee.code = ?',
    [user_code], function(err, rows, fields){
        if(err){
            console.log(err)
        } else {
            response.ok(rows, res)
        }
    });
};

exports.createEmployee = function(req, res){
    const code = req.body.code;
    const name = req.body.name;
    const job = req.body.job;
    const salary = req.body.salary;
    const employee_id = req.body.employee_id;
    const alamat = req.body.alamat;
    const umur = req.body.umur;
    const status = req.body.status;
    const data =req.body;

    db.query('INSERT INTO employee (code, name, job, salary) VALUES (?,?,?,?)', [code, name, job, salary], function(err, rows, fields){
        if(err){
            console.log(err)
        } else {
            console.log(rows)
            db.query('INSERT INTO data_employee (employee_id, alamat, umur, status) VALUES (?,?,?,?)', [employee_id, alamat, umur, status]);
            response.ok("Add Employee Success", res)
        }
    });
};


exports.updateEmployee = function(req, res){
    const user_code = req.params.code;
    const name = req.body.name;
    const job = req.body.job;
    const salary = req.body.salary;
    const data = [];
    db.query('UPDATE employee SET name = ?, job = ?, salary = ? WHERE code = ?', [name, job, salary, user_code],
        function(err, rows, fields){
        if(err){
            console.log(err)
        } else {
           
            response.ok('Update Success', res)
        }
    });
};

exports.deleteEmployee = function(req, res){
    const user_code = req.params.code;

    db.query('DELETE FROM employee WHERE code = ?', [user_code], function(err, rows, field){
        if(err){
            console.log(err)
        } else {
            db.query('DELETE FROM data_employee WHERE employee_id = ?', [user_code])
            response.ok('Delete Success', res)
        }
    });
};

exports.updateDataEmployee = function(req, res){
    const user_code = req.params.code;
    const alamat = req.body.alamat;
    const umur = req.body.umur;
    const status = req.body.status;

    db.query('UPDATE data_employee SET alamat = ?, umur = ?, status = ? WHERE employee_id = ?', [alamat, umur, status, user_code],
        function(err, rows, fields){
        if(err){
            console.log(err)
        } else {
            response.ok('Update Success', res)
        }
    });
};

