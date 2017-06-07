'use strict'; 

var models  = require('../server/models');
var bCrypt = require('bcrypt-nodejs');
var language = require('../server/enum/language');

/**
 * edit = 
 * recuperer le role de l'utilisateur dans la fonction,
 * si id token != id body = autoriser acces si admin
 * sinon bloquer ressource (middleware)
 */

var Users = {
    edit: function (req, res) {
        let isAdmin = req.role == 5;
        let id = req.body.id;

        //verifier role 
        new Promise(
            function(resolve, reject) {
                models.User_Role.findOne({
                    id_user: id
                }).then(function (user) {
                    
                }).catch(function (err) {
                    
                })
            }).then({
                
            });
        
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
        new Promise(
            function(resolve, reject) {
                models.User.findOne({
                    id : 1
                }).then(function(user) {
                    resolve(user);
                }).catch(function(err) {
                    reject(err);
                });
            }
        ).then(
            function(user) {
                console.log("Verify role : "+user);
                next();
            }).catch(
            function(err) {
                res.json(err);
            }
        );
    },
    list : function (req, res) {
        new Promise(
            function(resolve, reject) {
                models.User.findAll({
                }).then(function(user) {
                    resolve(user);
                }).catch(function(err) {
                    reject(err);
                });
            }
        ).then(
            function(user) {
                res.json(user);
            }).catch(
            function(err) {
                res.json(err);
            }
        );
    },
    findById : function (req, res) {
        let id = req.params.id;

        new Promise(
            function (resolve, reject) {
                models.User.findById({
                    id: id
                }).then(function (user) {
                    resolve(user);
                }).catch(function (err) {
                    reject(err);
                })
            }
        ).then(
            function (user) {
                res.json(user)
            }).catch(
            function (err) {
                res.json(langage.USER_FINDBYID_ERROR)
            }
        )

    },
    findByName : function (req, res) {
        let name = req.params.name;

        new Promise(
            function (resolve, reject) {
                models.User.findAll({
                },{
                    where: {
                        lastname : {
                            $like : name
                        }
                    }
                }).then(
                    function (user){
                        resolve(user);
                    }.catch(function (err){
                        reject(err);
                    })
                )
            }
        ).then(
            function (user) {
                res.json(user);
            }.catch(function (err){
                res.json(langage.USER_FINDBYNAME_ERROR)
            })
        )
    },
    status : function (req, res){
        let status = req.params.status;
        
        models.User.update({
            status: status
        })
    }
};

module.exports = Users;