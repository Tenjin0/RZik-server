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
