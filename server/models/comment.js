'use strict';

module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define('Comment', {
         content: {
            type: DataTypes.TEXT
        }
    }, {
        underscored: true,
        classMethods: {
            associate: function(models) {
                // Comment.belongsTo(models.User);

                //TODO un commentaire par personne et par audio ?
                // uniqueKeys : [{
                //     name        : "Unique value per gender",
                //     singleField : false,
                //     fields      : ["id_genre", "id_audiofile"],
                // }],
                Comment.belongsTo(models.User, {foreignKey: 'id_user'});
                Comment.belongsTo(models.Audiofile, {foreignKey: 'id_audiofile'});
                // associations can be defined here
            }
        },
        timestamps: true,
        createdAt: 'creation_date',
        updatedAt: 'update_date'

    });
    return Comment;
};
