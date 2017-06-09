'use strict';

module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
	  role: DataTypes.STRING,
  }, {
    tableName: 'role',
    timestamps: false,
    classMethods: {
      associate: function(models) {
        //Empty
        /**
         * anonyme = 1
         * utilisateur = 2
         * moderateur = 3
         * proprietaire = 4
         * administrateur = 5
         *
         */
      }
    }
  });
  return Role;
};