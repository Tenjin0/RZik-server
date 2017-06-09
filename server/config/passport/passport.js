var bCrypt = require('bcrypt-nodejs');
var config = require('../config.json');
var language = require('../../enum/language');
var role = require('../../enum/role');
var message = require('../../enum/message');

module.exports = function(passport, models) {

    let User = models.User;
    let User_Role = models.User_Role;
    let LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            let generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (user)
                {
                    message.error({signup: "email_exist_already"});
                    return done(null, false, message.send());
                } else {
                    let userPassword = generateHash(password);
                    let data =
                    {
                        email: email,
                        password: userPassword,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        nickname: req.body.nickname,
                        birth_date: req.body.birth_date
                    };
                    User.create(data).then(function(newUser, created) {
                        if (!newUser) {
                            message.error({signup: "user_not_returned"});
                            return done(null, false, message.send());
                        } else {
                            User_Role.create({
                                id_user: newUser.id,
                                id_role: role.USER
                            }).then(function (newRole, created) {
                                if(!newRole){
                                    message.error({signup: "role_not_added"});
                                    return done(null, false, message.send());
                                } else {
                                    return done(null, newUser, message.send());
                                }
                            });
                        }
                    });
                }
            });
        }
    ));
    
    passport.use('local-signin', new LocalStrategy(
        {
            // by default, local strategy uses username and password, we override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            };
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (!user) {
                    message.error({signin: "wrong_email"});
                    return done(null, false, message.send());
                }
                if (!isValidPassword(user.password, password)) {
                    message.error({signin: "wrong_password"});
                    return done(null, false, message.send());
                }
                
                var currenttime = new Date();
                user.update({last_login: currenttime},{
                    where: {
                        id: user.id
                    }
                });
                return done(null, user.get(), message.send());
            }).catch(function(err) {
                return done(err);
            });
        }
    ));
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
};