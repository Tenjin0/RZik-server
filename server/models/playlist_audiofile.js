'use strict';
module.exports = function(sequelize, DataTypes) {
    let PlaylistAudiofile = sequelize.define('PlaylistAudiofile', {}, {
        uniqueKeys : [{
            name        : "Unique value per audiofile",
            singleField : false,
            fields      : ["id_playlist", "id_audiofile"],
        }],
        timestamps: false,
        underscored: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.Playlist.belongsToMany(models.Audiofile, {
                    through: 'PlaylistAudiofile',
                    foreignKey: 'id_playlist'
                });
                models.Audiofile.belongsToMany(models.Playlist, {
                    through: 'PlaylistAudiofile',
                    foreignKey: 'id_audiofile'
                });

            }
        }
    });
    return PlaylistAudiofile;
};
