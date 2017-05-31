var express = require('express');
var router = express.Router();
var audioController = require('../controllers/audiofiles');
/* GET users listing. */
router.get('/', audioController.index);
router.post('/', audioController.create);
router.get('/:id', audioController.view);
router.post('/:id', audioController.update);

module.exports = router;
