'use strict'; 

var models  = require('../server/models');

var Users = {
    editview: function (req, res) {
        res.render('edit');
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
    }
};

module.exports = Users;