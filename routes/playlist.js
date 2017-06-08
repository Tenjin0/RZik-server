const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlist');
const Playlist = require('../server/models/').Playlist;


router.get('/', playlistController.index);
router.post('/', playlistController.create);


module.exports = router;
