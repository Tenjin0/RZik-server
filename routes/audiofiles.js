const express = require('express');
const router = express.Router();
const audioController = require('../controllers/audiofiles');

const multer = require('multer');

const audioFilter = function(req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(wav|pm3|flac|ogc)$/)) {
        return cb(new Error('Only audio files are allowed!'), false);
    }
    cb(null, true);
};
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
router.delete('/:id', audioController.delete);

module.exports = router;