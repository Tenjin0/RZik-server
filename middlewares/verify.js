var jwt = require('jsonwebtoken');
var config = require('../server/config/config.js');
var models  = require('../server/models');
const util = require('util');
var message = require('../server/enum/message');
const Role = models.Role;

exports.getToken = function(user) {
	return jwt.sign(user.id, config.secretKey);
};

exports.verifyUser = function(req, res, next) {
	var token = req.cookies['token'] || req.headers['authorization'] || req.query.token;
	if (token) {
		jwt.verify(token, config.secretKey, function(err, decoded) {
			if(err) {
				message.error({verify_user: err});
				res.status(401).json(message.send());
			} else {
				req.decoded = decoded;
				new Promise(
					function (resolve, reject) {
						models.User.findOne({
							where: {
								id: req.decoded
							},
							include: [{
								model: Role,
								attributes: ['id', 'role']
							}]
						}).then(function (user) {
							var roles = [];
							user.Roles.forEach(function(element) {
								roles.push(element.id);
							}, this);
							req.roles = roles;
							resolve(user);
						}).catch(function (err) {
							console.warn(err);
							reject(err)
						})
					}
				).then(
					function(user){
						if(user) {
							if(!user.activated){
								message.error({verify_user: "user_not_activated"});
								return res.status(401).json(message.send());
							} else if (user.deleted){
								message.error({verify_user: "user_deleted"});
								return res.status(401).json(message.send());
							}
							req.user = user;
							next();
						} else {
							throw "error user is null"
						}
				}).catch(function (err){
					message.error({verify_user: err});
					res.status(401).json(message.send());
				});
			}
		})
	}
	else {
		message.error({verify_user: "no_token"});
		res.status(401).json(message.send());
	}
};

exports.verifyRole = function(whitelist){
	return function(req, res, next) {
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
					req.role = roles;
					next();
				} else {
					message.error({verify_role: "access_not_allowed"});
					res.status(401).json(message.send());
				}
			}).catch(
				function (err) {
					message.error({verify_role: err});
					res.status(401).json(message.send());
				}
			)
	}
};
