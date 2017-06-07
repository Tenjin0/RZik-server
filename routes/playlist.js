const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlist');
const Playlist = require('../server/models/').Playlist;


router.get('/', playlistController.index);

/**
 * POST /api/playlist
 * name, description, id_user (from header : x-access-token)
 */
router.post('/', playlistController.create);

/**
 * POST /api/playlist/songs
 * id_audiofile, id_playlist
 */
router.post('/songs', playlistController.addSongs);


module.exports = router;
