'use strict';
const {Playlist, Audiofile, PlaylistAudiofile, User} = require('../server/models/');
const config = require('../config.js');


const index = (req, res) => {
  let opts = {
    include: [{
      model: Audiofile,
      attributes: ['id']
    }, {
      model: User,
      attributes: ['id', 'email']
    }]
  };
  if (req.query.limit && req.query.offset) {
    opts.limit = parseInt(req.query.limit, 10);
    opts.offset = parseInt(req.query.offset, 10);
  }
  Playlist.findAll(opts)
    .then((playlists) => {
      res.status(200).json(playlists);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
};

const create = (req, res) => {
  req.body.id_user = req.decoded;
  Playlist.create(req.body)
    .then((playlist) => {
      return res.status(200).send({message: 'playlist_created_success', playlist})
    })
    .catch((error) => {
      res.status(500).json(error);
    })
};


const addSongs = (req, res) => {
  PlaylistAudiofile.create(req.body)
    .then((playlistAudiofile) => {
      return res.status(200).send({message: 'playlist_audiofile_added_success', playlistAudiofile})
    })
    .catch((error) => {
      res.status(500).json(error);
    })
};


module.exports = {
  index,
  create,
  addSongs
};
