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
	  lastname: {
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
	  	timestamps: false,
		classMethods: {
			associate: function(models) {
				
			}
		}
	});
  return User;
};