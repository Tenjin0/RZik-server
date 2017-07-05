'use strict';
var moment = require('moment');

module.exports = function(sequelize, DataTypes) {
    var Audiofile = sequelize.define('Audiofile', {
        title: {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : {
                    msg : 'title_cannot_be_empty'
                },
                len : {
                    args : 3 , msg : "title_at_least_3_characters"
                }

            }
        },
        description: DataTypes.STRING,
        artist: {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : {
                    msg : 'artist_cannot_be_empty'
                },
                len : {
                    args : 3 , msg : "artist_at_least_3_characters"
                }

            }
        },
        composer: {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : {
                    msg : 'composer_cannot_be_empty'
                },
                len : {
                    args : 3 , msg : "composer_at_least_3_characters"
                }

            }
        },
        original_filename: DataTypes.STRING,
        new_filename: DataTypes.STRING,
        audio_mimetype: DataTypes.STRING,
        cover: {
            type : DataTypes.STRING,
            allowNull: false
        },
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
        genders:  {
            type : DataTypes.VIRTUAL,
            validate: {
                genders() {
                    if (this.genders === null)
                        throw new Error('genders_is_required')
                    if (this.genders.length === 0)
                        throw new Error('none_genders_selected')
                }
            }
        },
        creation_date:{
            type: DataTypes.DATEONLY,
            get: function() {
                return moment.utc(this.getDataValue('creation_date')).format('YYYY');
            },
            validate : {
                isDate : {
                    msg : "creation_date_invalid"
                }
            }
        }, 
        duration: {
            type : DataTypes.TIME,
            allowNull: false,
            validate : {
                notEmpty : {
                    msg : 'duration_cannot_be_empty'
                },
                duration() {
                    if(this.duration === '00:00:00')
                        throw new Error('duration_too_short')
                }
            }
        },
        total_view : {
            type : DataTypes.INTEGER,
            defaultValue : 0
        },
        total_download : {
            type : DataTypes.INTEGER,
            defaultValue : 0
        },
        activated: {
		  type: DataTypes.BOOLEAN,
		  defaultValue: true,
		  allowNull: false
	  }

    }, {
        validate: {
            audiofile() {
                if(!this.original_filename || !this.new_filename || !this.audio_mimetype)
                throw new Error('audiofile_error')
            }
        },
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
