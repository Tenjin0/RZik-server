var jwt = require('jsonwebtoken');
var config = require('../server/config/config.json');
var models  = require('../server/models');

exports.getToken = function(user) {
	return jwt.sign(user.id, config.secretKey);
};

exports.verifyUser = function(req, res, next) {
	var token = req.body.token || req.query.token || req.cookies['jwtToken'];
	//verifier token valide ok
	//verifier si id recuperer avec token = user activated a faire
	if (token) {
		jwt.verify(token, config.secretKey, function(err, decoded) {
			if(err) {
				res.status(401).json(err);
			}
			else {
				req.decoded = decoded;
				new Promise(
					models.User.findById({
						id: req.decoded
					},{
						where: {
							status: 1
						}
					}).then(function (user){
						resolve(user);
					}).catch(function (err){
						reject(err)
					})
				).then(
					function(user){
						next();
					}.catch(function (err){
						res.status(401).json(err);
					})
				);
			}
		})
	}
	else {
		res.status(401).json({message: "no token"});
	}
};

exports.verifyRole = function(requiredRole){
	return function(req, res, next){
		var cookies = cookie.parse(req.headers.cookie || '');
		var token = cookies['x-access-token'] || req.headers['x-access-token'];
		/*jwt.verify(token, config.secretKey, function(err, decoded) {
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
		})*/

		new Promise(
			function(resolve, reject) {
				models.User.findOne({
					id : req.decoded
				}).then(function(user) {
					resolve(user);
				}).catch(function(err) {
					reject(err);
				});
			}
		).then(
			function(user) {
				console.log("Verify role : "+user);
				next();
			}).catch(
			function(err) {
				res.json(err);
			}
		);
	}
};