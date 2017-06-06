'use strict'; 

var models  = require('../server/models');
var bCrypt = require('bcrypt-nodejs');
var language = require('../server/enum/enumerators');

var Users = {
    edit: function (req, res) {
        let pass = req.body.password;
        let generateHash = function() {
            return bCrypt.hashSync(pass, bCrypt.genSaltSync(8), null);
        };
        let userPassword = generateHash(pass);

        new Promise(
            function(resolve, reject) {
                models.User.update({
                    password : userPassword
                },{
                    where:{
                        id: req.decoded
                    }
                }).then(function(user) {
                    resolve(user);
                }).catch(function(err) {
                    reject(err);
                });
            }
        ).then(
            function(user) {
                res.json(language.USER_EDIT_SUCCESS);
            }).catch(
            function(err) {
                res.json(err);
            }
        );
    },
    test : function(req, res){
        console.log(language.USER_EDIT_SUCCESS);
        res.json();
    }
};

module.exports = Users;