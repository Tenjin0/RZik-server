'use strict';
module.exports = function(sequelize, DataTypes) {
    var Audiofile = sequelize.define('Audiofile', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        cover: DataTypes.STRING,
        artist: DataTypes.STRING,
        composer: DataTypes.STRING,
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
        creation_date: DataTypes.DATE,
        duration: DataTypes.TIME
    }, {
        timestamps: false,
        underscored: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Audiofile;
};