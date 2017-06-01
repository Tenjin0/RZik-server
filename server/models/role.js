'use strict';

module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
	  role: DataTypes.STRING,
  }, {
    tableName: 'role',
    timestamps: false,
    classMethods: {
      associate: function(models) {
          //Role.hasMany(models.Permission, {as: 'Permissions'});
      }
    }
  });
  return Role;
};