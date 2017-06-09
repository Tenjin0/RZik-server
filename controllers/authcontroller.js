var exports = module.exports = {};
var verify = require('../middlewares/verify');
var passport = require('passport');
var util = require('util');

exports.signup = function (req, res, next) {
    passport.authenticate('local-signup', (err, user, info) => {
        if(!has_error(res, err, info))
            send_token(res, user);
    })(req, res, next);
};

exports.signin = function (req, res, next) {
    passport.authenticate('local-signin', (err, user, info) => {
        if(!has_error(res, err, info))
            send_token(res, user)
    })(req, res, next);
};

function has_error(res, err, info){
    if (err || info.hasOwnProperty("error")){
        res.status(401).json(info).end();
        return true;
    }
}
function send_token(res, user){
    res.clearCookie('token');
    let token = verify.getToken(user);
    user.token = token;
    user.password = undefined;
    user.id = undefined;
    res.cookie('token', token, {maxAge: 900000, httpOnly: true});
    res.json(user);
}