const express = require('express');
const router = express.Router();
const audioController = require('../controllers/audiofiles');
const UPLOAD_PATH = require('../config.js').UPLOAD_PATH;
const multer = require('multer');
const Audiofile = require('../server/models/').Audiofile;
const upload = require('../middlewares/uploadAudio');
const verify = require('../middlewares/verify');
const role = require('../server/enum/role');

// const audioFilter = function(req, file, cb) {
//     // accept image only
//     if (!file.originalname.match(/\.(wav|pm3|flac|ogc)$/)) {
//         return cb(new Error('Only audio files are allowed!'), false);
//     }
//     cb(null, true);
// };

/* GET users listing. */
router.get('/', audioController.index);
router.get('/myuploads',verify.verifyRole([role.OWNER]), audioController.myuploads);
router.post('/metadata',verify.verifyRole([role.OWNER]), upload.metadata, audioController.metadata);
router.post('/',upload.both, audioController.create);
router.get('/:id',verify.verifyRole([role.OWNER, role.ADMINISTRATOR]), audioController.view);
router.get('/:id/cover', audioController.cover);
router.put('/:id',upload.cover,verify.verifyRole([role.OWNER, role.ADMINISTRATOR]),  audioController.update);
router.delete('/:id',verify.verifyRole([role.OWNER, role.ADMINISTRATOR]), audioController.delete);
router.get('/:id/:action(stream|download)', audioController.action);

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
