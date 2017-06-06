let authController = require('../controllers/authcontroller.js');

module.exports = function(app) {

    app.post('/signup', authController.signup);

    app.post('/signin', authController.signin);
    
};