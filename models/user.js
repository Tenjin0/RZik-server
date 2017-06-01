'use strict';
var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
	  firstName: DataTypes.STRING,
	  lastName: DataTypes.STRING,
	  nickname: DataTypes.STRING,
	  password: DataTypes.STRING,
	  mail: DataTypes.STRING,
	  birthdate: DataTypes.DATEONLY
  }, {
		freezeTableName: true,
		classMethods: {
			associate: function(models) {
				User.hasMany(models.Role, {as: 'Roles'});
			}
		}
	});
  return User;
};