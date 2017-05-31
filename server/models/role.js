'use strict';
var Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
	  role: DataTypes.STRING,
  }, {
    tableName: 'role',
    classMethods: {
      associate: function(models) {
          Role.hasMany(models.Permission, {as: 'Permissions'});
      }
    }
  });
  return Role;
};