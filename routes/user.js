var express = require('express');
var router = express.Router();
var user = require('../controllers/user.js');

router.get('/:id', user.editview);
router.put('/:id', user.edit);

module.exports = router;