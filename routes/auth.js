//let authController = require('../controllers/authcontroller.js');
var cookie = require('cookie');
var verify = require('../middlewares/verify');

module.exports = function(app, passport) {

    //app.get('/signup', authController.signup);

    //app.get('/signin', authController.signin);

    app.post('/signup', function (req, res, next) {
        passport.authenticate('local-signup', (err, userData) => {
            if(err){
                res.status(404).json(err).send().end();
            }else {
                let token = verify.getToken(userData);
                res.setHeader('Set-Cookie', cookie.serialize('x-access-token', token), {exp: Math.floor(Date.now() / 1000) + (60 * 60) * 3});
                res.json(userData);
            }
        })(req, res, next)
    });

    app.post('/signin', function (req, res, next) {
        passport.authenticate('local-signin',(err, userData) => {
            if(err){
                res.status(404).json({ error: err }).send().end();
            }else {
                let token = verify.getToken(userData);
                res.setHeader('Set-Cookie', cookie.serialize('jwt', token), {exp: Math.floor(Date.now() / 1000) + (60 * 60) * 3});
                res.json(userData);
            }
        })(req, res, next)
    } );

    //app.get('/dashboard', passport.authenticate('jwt', { session: false }), authController.dashboard);
/*
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }
*/
};