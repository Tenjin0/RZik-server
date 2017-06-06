const express = require('express');
const router = express.Router();
const genderController = require('../controllers/genders');


router.get('/', genderController.index);
module.exports = router;
