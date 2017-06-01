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
    edit: function (req, res) {
        let pass = req.body.password;
        let generateHash = function() {
            return bCrypt.hashSync(pass, bCrypt.genSaltSync(8), null);
        };
        let userPassword = generateHash(password);
        models
            .user
            .update({
                password: userPassword
            })
            .then(function(user) {
                console.log(user.nickname + "have been edited")
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