let authController = require('../controllers/authcontroller.js');

module.exports = function(app) {

  /**
   * POST REGISTER : /signup
   * email, password
   */
  app.post('/signup', authController.signup);

  app.post('/signin', authController.signin);
    
};
