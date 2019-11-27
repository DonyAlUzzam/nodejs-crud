'user strict';

let Employee = function(code, name, job, salary, alamat, umur, status){
    this.code = code;
    this.name = name;
    this.job = job;
    this.salary = salary;
    this.alamat = alamat;
    this.umur = umur;
    this.status = status;
}

module.exports = Employee;