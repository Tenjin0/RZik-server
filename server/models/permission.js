'use strict';

module.exports = function(sequelize, DataTypes) {
  var Permission = sequelize.define('Permission', {
	  permission: DataTypes.STRING,
  }, {
    tableName: 'permission',
    timestamps: false,
    classMethods: {
      associate: function(models) {
		  //Empty
      }
    }
  });
  return Permission;
};