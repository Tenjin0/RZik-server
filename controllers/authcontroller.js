var exports = module.exports = {};
var verify = require('../middlewares/verify');
var passport = require('passport');

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
    if (err){
        res.status(401).json(err).end();
        return true;
    }
    else if (info.message) {
        res.status(401).json(info).end();
        return true;
    }
}
function send_token(res, user){
    user.password = undefined;
    res.clearCookie('jwtToken');
    let token = verify.getToken(user);
    res.cookie('jwtToken', token, {maxAge: 900000, httpOnly: true});
    res.send({user, token}).end();
}
