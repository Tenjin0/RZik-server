var express = require('express');
var router = express.Router();

var user = require('../controllers/User.js');
 
/* GET home page. */
router.route('/register')
	.post(user.create);
	
router.route('/connect')
	.get(user.connect);

module.exports = router;