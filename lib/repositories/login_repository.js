'use strict';

let Login = require('../domains/login');

let LoginRepository = function(db){
    this.db = db;
}

LoginRepository.prototype ={
  
    findAll: function(username, password, cb, errCb){
        let db = this.db;
        let query = 'SELECT * FROM login WHERE username = ? AND password = ?';
        db.query(query, [username, password], (err, results, fields) => {
            if(err){
                errCb(err);
            }
           console.log(username)
            let result = results[0];
            console.log(JSON.stringify(results))
            if(!results){
                cb('data tidak terdaftar');
            } else {
                let login = new Login(results.username, results.password, results.email);
                
                cb(login);
            }
        });
    },

}

module.exports = LoginRepository;