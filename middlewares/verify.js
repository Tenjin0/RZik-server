var User = require('../server/models/user');
var jwt = require('jsonwebtoken');
var config = require('../server/config/config.json');
var cookie = require('cookie');

exports.getToken = function(user) {
	return jwt.sign(user, config.secretKey);
};

exports.verifyUser = function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, config.secretKey, function(err, decoded) {
			if(err) {
				res.json(err);
			}
			else {
				req.decoded = decoded;
				next();
			}
		})
	}
	else {
		res.json({message: "no token"});
	}
};

exports.verifyRole = function(requiredRole){
	return function(req, res, next){
		var cookies = cookie.parse(req.headers.cookie || '');
		var token = cookies['x-access-token'] || req.headers['x-access-token'];
		jwt.verify(token, config.secretKey, function(err, decoded) {
			if(err) {
				res.json(err);
			}
			else {
				if(requiredRole.includes(decoded._doc.idRole)){
					res.setHeader('Set-Cookie', cookie.serialize('x-access-token', token),{ maxAge: 60*60*24});
					req.decoded = decoded;
					next();
				}else{
					res.json({message: "not allowed to load this ressource"});	
				}
			}
		})
	}
}