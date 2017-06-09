'use strict'; 

var models  = require('../server/models');
var bCrypt = require('bcrypt-nodejs');
var language = require('../server/enum/language');
var role = require('../server/enum/role');
const util = require('util');
var message = require('../server/enum/message');
//let message = {error:{},success:{}};
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
var Users = {
    edit: function (req, res) {
        message.init();
        let isAdmin = req.role.includes(role.ADMINISTRATOR);
        let id = req.body.id;

        if(!isAdmin && id != req.decoded){
            message.error({update_users: "update_another_id_not_allowed"});
            res.status(401).json(message.send());
        } else {
            if(req.body.email || req.body.nickname) {
                new Promise(
                    function (resolve, reject) {
                        models.User.findAll({
                            where: {
                                $or:[
                                        {email: req.body.email},
                                        {nickname: req.body.nickname}
                                    ]
                            }
                        }).then(function (user) {
                            resolve(user);
                        }).catch(function (err) {
                            reject(err);
                        })
                    }
                ).then(
                    function (user) {
                        if (user) {
                            let tot = user.length;
                            let found_email = false;
                            let found_nickname = false;
                            let i = 0;

                            for (; i < tot; i++) {
                                if (user[i].email == req.body.email) {
                                    found_email = true;
                                }
                                if (user[i].nickname == req.body.nickname) {
                                    found_nickname = true;
                                }
                            }
                            if (found_email)
                                message.error({update_users: "mail_exist_already"});
                            if (found_nickname)
                                message.error({update_users: "nickname_exist_already"});

                            if (found_email || found_nickname) {
                                res.status(401).json(message.send());
                            } else {
                                //update
                                let user_client = {
                                    email: req.body.email,
                                    firstname: req.body.firstname,
                                    lastname: req.body.lastname,
                                    nickname: req.body.nickname,
                                    birth_date: req.body.birth_date
                                };

                                let userPassword = null;

                                if (req.body.password) {
                                    let pass = req.body.password;
                                    let generateHash = function () {
                                        return bCrypt.hashSync(pass, bCrypt.genSaltSync(8), null);
                                    };
                                    userPassword = generateHash(pass);

                                    user_client.password = userPassword;
                                }

                                new Promise(
                                    function (resolve, reject) {
                                        models.User.update(
                                            user_client, {
                                                where: {
                                                    id: req.body.id
                                                }
                                            }
                                        ).then(function (user) {
                                            resolve(user);
                                        }).catch(function (err) {
                                            reject(err);
                                        })
                                    }
                                ).then(
                                    function (user) {
                                        message.success({update_users: "user_updated"});
                                        res.json(message.send());
                                    }).catch(function (err) {
                                    message.error({update_users: err});
                                    res.json(message.send());
                                });
                            }
                        }
                    }
                ).catch(function (err) {
                    message.error({err: err});
                    res.status(401).json(message.send());
                });
            }
        }
    },
    test : function(req, res){
        console.log("getkaubyvalue : "+getKeyByValue(Users, this));
        //message.error += {verify_user: "erreur1"};
        //message.error += {verify_user: "erreur2"};
        message.error({verify_user: "erreur1"});
        message.error({verify_user: "erreur2"});

        console.log(util.inspect(message.send(), false, true));
        //console.log(message.send());
        res.json(message.send());
        res.end();
    },
    list : function (req, res) {
        new Promise(
            function(resolve, reject) {
                models.User.findAll({})
                    .then(function(user) {
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
                message.error({list_users: err});
                res.json(message.send());
            }
        );
    },
    findById : function (req, res) {
        let id = req.params.id;

        new Promise(
            function (resolve, reject) {
                models.User.findOne({
                    where: {
                        id: id
                    }
                }).then(function (user) {
                    resolve(user);
                }).catch(function (err) {
                    reject(err);
                })
            }
        ).then(
            function (user) {
                 if(user) {
                     res.json(user);
                 } else {
                     message.error({findById_users: "user_not_found"});
                     res.status(401).json(message.send());
                 }
            }
        ).catch(
            function (err) {
                message.error({findById_users: err});
                res.status(401).json(message.send());
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
                message.error({findByName_users: err});
                res.status(401).json(message.send());
            })
        )
    },
    activate : function (req, res){
        let status = req.params.status;
        let id = null;
        if(typeof status != boolean){
            message.error({activate_users: "activate_should_be_boolean"});
            res.status(401).json(message.send());
        }

        if(req.role.includes(role.ADMINISTRATOR)){
            id = req.body.id
        } else {
            id = req.decoded
        }

        new Promise(
            function(resolve, reject) {
                models.User.update({
                    activated: status
                }, {
                    where: {
                        id: id
                    }
                }).then(function (user){
                    resolve(user);
                }).catch(function (err){
                    reject(err);
                })
            }
        ).then(
            function (user) {
                message.success({activate_users: "status_updated"});
                res.json(message.send())
            }).catch(function (err){
            message.error({activate_users: err});
            res.status(401).json(message.send());
        })
    },
    delete : function (req, res) {
        new Promise(
            function (resolve, reject){
                models.User.update({
                    deleted: NOW
                }).then(function (user){
                    resolve(user);
                }).catch(function (err){
                    reject(err);
                })
            }
        ).then(function (user){
            message.success({delete_users: "deleted_user"});
            res.json(message.send());
        }).catch(function (err) {
            message.error({delete_users: err});
            res.status(401).json(message.send());
        })
    }
};

module.exports = Users;