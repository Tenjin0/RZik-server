'use strict';
var Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  var Permission = sequelize.define('Permission', {
	  permission: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
		  //Empty
      }
    }
  });
  return Permission;
};