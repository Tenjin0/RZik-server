'use strict'; 

var models  = require('../server/models');

var Users = {
    create: function (req, res) {
         models
            .user
            .create({mail: req.body.mail, password: req.body.password})
            .then(function(user) {
                console.log(user.nickname + "is created")
          });

    },
	connect: function (req, res) {
         models
            .user
            .findOne({where:{mail: req.body.mail, password: req.body.password}})
            .then(function(user) {
                if(user){
					console.log(user.nickname + "is connected")
				}else{
					console.log("Identifiant / Mot de passe incorrect")
				}
          });

    }
};

module.exports = Users;