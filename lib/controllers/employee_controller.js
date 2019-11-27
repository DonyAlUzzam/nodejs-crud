'use strict';

let db = require('../config/mysql_config');
let EmployeeRepository = require('../repositories/employee_repository');
let Employee = require('../domains/employee')

let saveEmployee = (req, res, next) => {
    if(!req.body){
        next('semua field harus diisi..')
    }
    let data = req.body;
    console.log(data)
    let employee = new Employee(data.code, data.name, data.job, parseFloat(data.salary), data.employee_id, data.alamat, data.umur, data.status);
    let employeeRepo = new EmployeeRepository(db);
    employeeRepo.save(employee, result => {
        console.log(employee)
        res.send('Tambah data suksess');
        next();
    }, err => {
        if(err){
            next(err)
        }
    });
};

let updateEmployee = (req, res, next) => {
    if(!req.body){
        next('Semua field harus diisi')
    }
    if(!req.params){
        next('parameter tidak ada..')
    }
    let data = req.body;
    let code = req.params.code;
    let employee = new Employee(code, data.name, data.job, parseFloat(data.salary));
    let employeeRepo = new EmployeeRepository(db);
    employeeRepo.update(employee, result => {
        res.send(employee);
        next();
    }, err => {
        if(err){
            next(err)
        }
    });
};

let deleteEmployee = (req, res, next) => {

    if(!req.params){
        next('parameter tidak ada..')
    }
    let code = req.params.code;
    let employeeRepo = new EmployeeRepository(db);
    employeeRepo.delete(code, result => {
        res.send('data berhasil di hapus')
        next();
    }, err => {
        if(err){
            next(err);
        }
    });
};

let getEmployee = (req, res, next) => {
    if(!req.params){
        next('parameter tidak ada..')
    }
    let code = req.params.code;
    let employeeRepo = new EmployeeRepository(db);
    employeeRepo.findOne(code, result => {
        res.status(200).json({message: 'get employee', data: result});
        next();
    }, err => {
        if(err){
            next(err);
        }
    });
};

let getEmployees = (req, res, next) => {
    let employeeRepo = new EmployeeRepository(db);
    employeeRepo.findAll(result =>{
        res.status(200).json({message: 'get all employee', data: result});
        next();
    }, err => {
        if(err){
            next(err);
        }
    });
};

module.exports = {
    saveEmployee: saveEmployee,
    updateEmployee: updateEmployee,
    deleteEmployee: deleteEmployee,
    getEmployee: getEmployee,
    getEmployees: getEmployees
}