var express = require('express');
var router = express.Router();
var user = require('../controllers/User.js');

module.exports = function(app, passport) {

    app.get('/edit', user.edit);

};