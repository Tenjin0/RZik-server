'use strict';
const model = require('../server/models/');
const Playlist = model.Playlist;
const Audiofile = model.Audiofile;
const config = require('../config.js');


const index = (req, res) => {
  let opts = {
    include: [{
      model: Audiofile,
      attributes: ['id']
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
      console.warn(error);
      res.status(500).json(error);
    })
};

const create = (req, res) => {
  console.warn('create playlist');
  if (!req.body.genders) {
    req.body.genders = [];
  }
  Playlist.create(req.body)
    .then((audiofile) => {
      console.warn('titi');
      createAudioGender(audiofile, req.body.genders, (err, genders) => {
        console.warn(err);
        if (err) {
          return res.status(500).json({message: 'audiofile_created_genders_error'});
        }
        console.warn('toot');
        audiofile.genders = genders;
        console.warn(audiofile);
        return res.status(201).send({message : 'audiofile_created_success', audiofile, genders})
      })
    })
    .catch((error) => {
      res.status(500).json(error);
    })
};


module.exports = {
  index,
  create
};
