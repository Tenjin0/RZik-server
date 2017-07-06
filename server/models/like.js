'use strict';

module.exports = function(sequelize, DataTypes) {
    var Like = sequelize.define('Like', {
    }, {
        underscored: true,
        classMethods: {
            associate: function(models) {

                Like.belongsTo(models.User, {foreignKey: 'id_user'});
                Like.belongsTo(models.Audiofile, {foreignKey: 'id_audiofile'});
                // associations can be defined here
            }
        },
        uniqueKeys : [{
            name        : "Unique value per Likes",
            singleField : false,
            fields      : ["id_user", "id_audiofile"],
        }],
        timestamps: true,
        createdAt: 'creation_date',
        updatedAt: 'update_date'

    });
    return Like;
};
