var express = require('express');
var router = express.Router();
var user = require('../controllers/user.js');
var verify = require('../middlewares/verify');

router.put(
    '/:id',
    verify.verifyUser,
    user.edit);

module.exports = router;