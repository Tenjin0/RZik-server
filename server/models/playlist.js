'use strict';

module.exports = function(sequelize, Sequelize) {
  let Playlist = sequelize.define('Playlist', {
	  id: {
		  autoIncrement: true,
		  primaryKey: true,
		  type: Sequelize.INTEGER
	  },
	  name: {
		  type: Sequelize.STRING,
		  notEmpty: true
	  },
	  description: {
		  type: Sequelize.STRING,
		  notEmpty: true
	  }
  }, {
	  	timestamps: false,
		classMethods: {
          associate: function(models) {
            // associations can be defined here
            models.User.belongsTo(models.User, {
              through: 'User',
              foreignKey: 'id_user'
            });

          }
		}
	});
  return Playlist;
};