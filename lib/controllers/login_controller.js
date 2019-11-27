'use strict';

let db = require('../config/mysql_config');
let jwt = require('jsonwebtoken');
let LoginRepository = require('../repositories/login_repository');
let Login = require('../domains/login')
const config = require('../config/configToken')
const response = require('../response/res');
const md5 = require('md5');
const tokenList = {}

let SingIn = function(req, res){
    let username = req.body.username;
    let password = md5(req.body.password);
    const user = {
        username: req.body.username,
        password: req.body.password
    }

    if(username == '' && password == ''){
        res.status(200).json({status: false})
    } else {
        console.log('not null')
        db.query('SELECT * FROM login WHERE username = ? AND password= ?', [username, password],
        function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                console.log(rows)
                if(rows[0]==undefined){
                    console.log("null")
                    res.status(200).json({status: false, message: "username or password is wrong"})
                } else{
                    const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
                    const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
                    const response = {
                        "status": "Logged in",
                        "data": user,
                        "token": token,
                        "refreshToken": refreshToken,
                    }
                    tokenList[refreshToken] = response
                    res.status(200).json(response);
                    console.log("notnull")
                }
                
            }
        });
    }

}

// let SingIn = (req, res, next) => {
//     let username = req.body.username;
//     let password = req.body.password;
//     const user = {
//         username: req.body.username,
//         password: req.body.password
//     }
//     let loginRepo = new LoginRepository(db);
//     loginRepo.findAll(username, password, result => {
//         // res.status(200).json({data: result});
//         next();
//     }, err => {
//         if(err){
//             next(err);
//         }
//     });
//     const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
//     const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
//     const response = {
//         "status": "Logged in",
//         "data": user,
//         "token": token,
//         "refreshToken": refreshToken,
//     }
//     tokenList[refreshToken] = response
//     res.status(200).json(response);
// };

let Logout = (req, res, next) => {
    res.status(200).send({ auth: false, token: null });
};

let Register = function(req, res) {
    
    var username = req.body.username;
    var password = md5(req.body.password);
    var email = req.body.email;

    db.query('INSERT INTO login (username, password, email) values (?,?,?)',
    [ username, password, email ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            // response.ok("Berhasil menambahkan user!", res)
            res.status(200).send({ status: "success", message: "add user berhasil" });
        }
    });
};

module.exports = {
    SingIn: SingIn,
    Logout: Logout,
    Register: Register
}

