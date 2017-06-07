var bCrypt = require('bcrypt-nodejs');
var config = require('../config.json');
var language = require('../../enum/language');
var role = require('../../enum/role');

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
            let errors = {};
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
                    errors.message = language.AUTH_EMAIL_EXIST;
                    return done(null, false, errors);
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
                            errors.message = language.SIGNUP_UNKNOWN_ERROR;
                            return done(null, false, errors);
                        } else {
                            User_Role.create({
                                id_user: newUser.id,
                                id_role: role.USER
                            }).then(function (newRole, created) {
                                if(!newRole){
                                    errors.message = language.SIGNUP_UNKNOWN_ERROR;
                                    return done(null, false, errors);
                                } else {
                                    return done(null, newUser, errors);
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
            let errors = {};

            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            };

            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (!user) {
                    errors.message = language.AUTH_EMAIL_NOT_EXIST;
                    return done(null, false, errors);
                }

                if (!isValidPassword(user.password, password)) {
                    errors.message = language.AUTH_WRONG_PASSWORD;
                    return done(null, false, errors);
                }
                var currenttime = new Date();
                user.update({last_login: currenttime},{
                    where: {
                        id: user.id
                    }
                });
                return done(null, user.get(), errors);
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