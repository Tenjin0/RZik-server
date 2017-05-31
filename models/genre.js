'use strict';
module.exports = function(sequelize, DataTypes) {
    var Genre = sequelize.define('Genre', {
        name: DataTypes.STRING
    }, {
        timestamps: false,
        underscored: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Genre;
};