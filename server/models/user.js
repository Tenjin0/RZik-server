'use strict';

module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define('User', {
	  id: {
		  autoIncrement: true,
		  primaryKey: true,
		  type: Sequelize.INTEGER
	  },
	  firstname: {
		  type: Sequelize.STRING,
		  notEmpty: true
	  },
	  lastName: {
		  type: Sequelize.STRING,
		  notEmpty: true
	  },
	  nickname: {
		  type: Sequelize.STRING,
		  notEmpty: true
	  },
	  password: {
		  type: Sequelize.STRING,
		  allowNull: false
	  },
	  email: {
		  type: Sequelize.STRING,
		  validate: {
			  isEmail: true
		  }
	  },
	  last_login: {
		  type: Sequelize.DATE
	  },
	  birth_date: Sequelize.DATEONLY,
	  token: Sequelize.STRING,
	  isModified: Sequelize.BOOLEAN
  }, {
	  	tableName: 'user',
		classMethods: {
			associate: function(models) {
				User.hasMany(models.Role, {as: 'Roles'});
			}
		}
	});
  return User;
};