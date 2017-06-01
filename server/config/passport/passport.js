var bCrypt = require('bcrypt-nodejs');
var config = require('../config.json');

module.exports = function(passport, user) {

    let User = user;
    let LocalStrategy = require('passport-local').Strategy;
    var JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt;
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromHeader('jwt');
    opts.secretOrKey = config.secretKey;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log("authentication process");
        User.findOne({id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));

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
                    return done(true, false, {
                        message: 'That email is already taken'
                    });
                } else
                {
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
                            return done(true, false, {
                                message: 'Something went wrong with your Signup'
                            });
                        }
                        if (newUser) {
                            return done(null, false, newUser);
                        }
                    });
                }
            });
        }
    ));

    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(
        {
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            var User = user;
            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            };
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (!user) {
                    return done(true, false, {
                        message: 'Email does not exist'
                    });
                }

                if (!isValidPassword(user.password, password)) {
                    return done(true, false, {
                        message: 'Incorrect password.'
                    });
                }
                return done(null, user.get());
            }).catch(function(err) {
                console.log("Error:", err);
                return done(true, false, {
                    message: 'Something went wrong with your Signin'
                });
            });
        }
    ));

    //serialize
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // deserialize user
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