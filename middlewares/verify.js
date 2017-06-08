var jwt = require('jsonwebtoken');
var config = require('../server/config/config.json');
var models  = require('../server/models');
const util = require('util');
let message = {error:{},success:{}};

//module de validation dans le middleware - renomer verifyRole en control ?

exports.getToken = function(user) {
	return jwt.sign(user.id, config.secretKey);
};

exports.verifyUser = function(req, res, next) {
	var token = req.cookies['token'];
	if (token) {
		jwt.verify(token, config.secretKey, function(err, decoded) {
			if(err) {
				message.error = {verify_user: err};
				res.status(401).json();
				end();
			} else {
				req.decoded = decoded;
				new Promise(
					function (resolve, reject) {
						models.User.findOne({
							where: {
								id: req.decoded
							}
						}).then(function (user) {
							resolve(user);
						}).catch(function (err) {
							reject(err)
						})
					}
				).then(
					function(user){
						if(user) {
							if(!user.activated){
								message.error = {verify_user: "user_not_activated"};
								res.status(401).json(message);
								end();
							}else if (user.deleted){
								message.error = {verify_user: "user_deleted"};
								res.status(401).json(message);
								end();
							}
							console.log("verifyUser success");
							next();
						} else {
							throw "error user is null"
						}
				}).catch(function (err){
					console.log("verifyUser error");
					message.error = {verify_user: err};
					res.status(401).json(message);
				});
			}
		})
	}
	else {
		console.log("verifyUser error token");
		message.error = {verify_user: "no_token"};
		res.status(401).json(message);
		end();
	}
};

exports.verifyRole = function(whitelist){
	return function(req, res, next) {
		console.log("verifyng role");
		new Promise(
			function (resolve, reject) {
				models.User_Role.findAll({
					where: {
						id_user: req.decoded
					}
				}).then(function (user) {
					resolve(user);
				}).catch(function (err) {
					reject(err);
				});
			}
		).then(
			function (user_role) {
				let found = false;
				let tot = user_role.length;
				let i = 0;
				let roles = [];

				for(; i < tot;i++){
					roles.push(user_role[i].id_role);
				}

				let tot_roles = whitelist.length;
				let j = 0;

				for(; j<tot_roles; j++){
					if(roles.includes(whitelist[j])){
						found = true;
					}
				}
				if (found){
					console.log("verifyRole success");
					req.role = roles;
					next();
				} else {
					console.log("verifyRole error");
					message.error = {verify_role: "access_not_allowed"};
					res.status(401).json(message);
					end();
				}
			}).catch(
				function (err) {
					console.log("verifyRole error catch");
					message.error = {verify_role: err};
					res.status(401).json(message);
				}
			)
	}
};