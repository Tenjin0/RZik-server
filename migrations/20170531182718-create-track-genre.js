'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('trackGenres', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('trackGenres');
    }
};