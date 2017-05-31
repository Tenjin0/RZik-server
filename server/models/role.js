'use strict';
var Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
	  role: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
		   Role.hasMany(models.Permission, {as: 'Permissions'});
      }
    }
  });
  return Role;
};