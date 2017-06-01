'use strict';
module.exports = function(sequelize, DataTypes) {
    var trackGenre = sequelize.define('AudioGenres', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false,
        underscored: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.Genre.belongsToMany(models.Audiofile, {
                    through: 'AudioGenres',
                    foreignKey: 'id_genre',
                    onDelete: 'cascade'
                });
                models.Audiofile.belongsToMany(models.Genre, {
                    through: 'AudioGenres',
                    foreignKey: 'id_audiofile',
                    onDelete: 'cascade'
                });

            }
        }
    });
    return trackGenre;
};