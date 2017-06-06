'use strict';
module.exports = function(sequelize, DataTypes) {
    var audioGender = sequelize.define('AudioGenders', {
        // id: {
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true,
        //     type: DataTypes.INTEGER
        // }

    }, {
        uniqueKeys : [{
            name        : "Unique value per gender",
            singleField : false,
            fields      : ["id_genre", "id_audiofile"],
        }],
        timestamps: false,
        underscored: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.Audiofile.belongsToMany(models.Gender, {
                    through: 'AudioGenders',
                    foreignKey: 'id_audiofile',
                    onDelete: 'cascade'
                });
                models.Gender.belongsToMany(models.Audiofile, {
                    through: 'AudioGenders',
                    foreignKey: 'id_genre',
                    onDelete: 'cascade'
                });

            }
        }
    });
    return audioGender;
};
