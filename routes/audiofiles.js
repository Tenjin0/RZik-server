const express = require('express');
const router = express.Router();
const audioController = require('../controllers/audiofiles');

const multer = require('multer');

const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/` }) // multer configuration
;

/* GET users listing. */
router.get('/', audioController.index);
router.post('/', upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'audio_file', maxCount: 1 }
]), audioController.create);
router.get('/:id', audioController.view);
router.post('/:id', audioController.update);

module.exports = router;