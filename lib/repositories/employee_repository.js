'use strict';

let Employee = require('../domains/employee');

let EmployeeRepository = function(db){
    this.db = db;
}

EmployeeRepository.prototype ={
    save: function(e, cb, errCb){
        let db = this.db;
        let data = {code: e.code, name: e.name, job: e.job, salary: e.salary};
        let data2 = {employee_id: e.code, alamat: e.alamat, umur: e.umur, status: e.status}
        // let data = {}
        // console.log(data)
        let query = 'INSERT INTO employee SET ?';
        
        db.query(query, data, (err, result) => {
            if(err){
                errCb(err);
            } else {
                let query2 = 'INSERT INTO data_employee SET ?';
                db.query(query2, data2)
                cb(result)
            }
        });
    },

    update: function(e, cb, errCb){
        let db = this.db;
        let data = [e.name, e.job, e.salary,  e.code];
        let query = 'UPDATE employee SET name = ?, job = ?, salary = ? WHERE code = ?';
        db.query(query, data, (err, result)=>{
            if(err){
                errCb(err);
            }
            cb(result); 
        });
    },

    delete: function(code, cb, errCb){
        let db = this.db;
        let query = 'DELETE FROM employee WHERE code = ?';
        db.query(query, [code], (err, result) => {
            if(err){
                errCb(err);
            }
            cb(result); 
        });
    },

    findOne: function(code, cb, errCb){
        let db = this.db;
        let query = 'SELECT employee.code as id, employee.name as name, employee.job as job, employee.salary as salary, data_employee.alamat as alamat, data_employee.umur as umur, data_employee.status as status FROM employee JOIN data_employee ON employee.code=data_employee.employee_id WHERE code = ?';
        db.query(query, [code], (err, results, fields) => {
          
            if(err){
                errCb(err);
            }
            let result = results[0];
            
            console.log(result)
            if(!result){
                cb(`data with code = ${code} not found..`);
            } else {
                let employee = new Employee(result.id, result.name, result.job, result.salary, result.alamat, result.umur, result.status);
                console.log(employee)
                cb(employee);
            }
        });
    },

    findAll: function(cb, errCb){
        let db = this.db;
        let query = 'SELECT * FROM employee';
        db.query(query, (err, results, fields) => {
            if(err){
                errCb(err);
            }
            let employees = [];
            for(let i=0; i<results.length; i++){
                let e = results[i];
                let employee = new Employee(e.code, e.name, e.job, e.salary);
                employees.push(employee);
            }
            cb(employees);
        });
    }
};

module.exports = EmployeeRepository;