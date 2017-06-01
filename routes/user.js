var express = require('express');
var router = express.Router();
var user = require('../controllers/user.js');
var passport = require('passport');

router.get('/:id', user.editview);
router.put(
    '/:id',
    passport.authenticate("jwt", { session: false }),
    user.edit);

module.exports = router;