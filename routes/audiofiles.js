const express = require('express');
const router = express.Router();
const audioController = require('../controllers/audiofiles');
const UPLOAD_PATH = require('../config.js').UPLOAD_PATH;
const multer = require('multer');
const Audiofile = require('../server/models/').Audiofile;

const audioFilter = function(req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(wav|pm3|flac|ogc)$/)) {
        return cb(new Error('Only audio files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration
var storage = multer.memoryStorage(),
  uploadMetadata = multer({
      storage: storage
  }).single('audio_file');

/* GET users listing. */
router.get('/', audioController.index);
router.get('/myuploads', audioController.myuploads);
router.post('/metadata',uploadMetadata, audioController.metadata);
router.post('/', upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'audio_file', maxCount: 1 }
]), (req, res, next) => {
    next();
}, audioController.create);
router.get('/:id', audioController.view);
router.put('/:id', audioController.update);
router.delete('/:id', audioController.delete);
router.get('/:id/stream', audioController.stream);
router.use('/:id/comments', (req, res, next) => {
    Audiofile.findById(req.params.id)
    .then((audiofile) => {
        if (!audiofile) {
            return res.status(404).send({message : 'audio_not_found'}).end()
        }
        req.audiofile = audiofile;
        next();
    })
    .catch((error) => {
        res.status(500).send(error).end()
    })
})
router.get('/:id/comments', audioController.viewComments)
router.post('/:id/comments', audioController.createComment)
router.get('/:id/comments/:id_comment', audioController.viewComment)
router.put('/:id/comments/:id_comment', audioController.updateComment)
router.delete('/:id/comments/:id_comment', audioController.deleteComment)
module.exports = router;
