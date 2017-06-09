'use strict';
var moment = require('moment');

module.exports = function(sequelize, DataTypes) {
    var Audiofile = sequelize.define('Audiofile', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        artist: DataTypes.STRING,
        composer: DataTypes.STRING,
        original_filename: DataTypes.STRING,
        new_filename: DataTypes.STRING,
        audio_mimetype: DataTypes.STRING,
        cover: DataTypes.STRING,
        cover_mimetype: DataTypes.STRING,
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
        creation_date:{
            type: DataTypes.DATEONLY,
            get: function() {
                return moment.utc(this.getDataValue('creation_date')).format('YYYY-MM-DD');
            }
        }, 
        duration: DataTypes.TIME,
        total_view : {
            type : DataTypes.INTEGER,
            defaultValue : 0
        },
        total_download : {
            type : DataTypes.INTEGER,
            defaultValue : 0
        },

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
