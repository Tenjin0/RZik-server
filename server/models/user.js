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
		  notEmpty: true,
		  unique: true
	  },
	  password: {
		  type: Sequelize.STRING,
		  allowNull: false
	  },
	  email: {
		  type: Sequelize.STRING,
		  unique: true,
		  validate: {
			  isEmail: true
		  }
	  },
	  birth_date: Sequelize.DATEONLY,
	  last_login: {
		  type: Sequelize.DATE,
		  defaultValue: Sequelize.NOW
	  },
	  //activate when user confirm email !! add activation verification in verifyUser
	  activated: {
		  type: Sequelize.BOOLEAN,
		  defaultValue: false,
		  allowNull: false
	  },
	  deleted: {
		  type: Sequelize.DATE,
		  defaultValue: null
	  }
  }, {
	  	tableName: 'user',
	  	timestamps: false,
		classMethods: {
			associate: function(models) {
				//Empty
			}
		}
	});
  return User;
};