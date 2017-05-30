const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password');

const Audiofiles = sequelize.define('audiofiles', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});
