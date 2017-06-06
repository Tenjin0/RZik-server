'use strict';

module.exports = function(sequelize, DataTypes) {
    var Audiofile = sequelize.define('Audiofile', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        cover: DataTypes.STRING,
        artist: DataTypes.STRING,
        composer: DataTypes.STRING,
        original_filename: DataTypes.STRING,
        new_filename: DataTypes.STRING,
        mimetype: DataTypes.STRING,
        explicit_content: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        download_authorization: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        transfert_date: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        genders: DataTypes.VIRTUAL,
        creation_date: DataTypes.DATE,
        duration: DataTypes.TIME
    }, {
        timestamps: false,
        underscored: true,
        classMethods: {
            associate: function(models) {
                Audiofile.belongsTo(models.User, {foreignKey: 'id_user'});
                // associations can be defined here
            }
        }
    });
    return Audiofile;
};
