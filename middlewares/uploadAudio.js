const multer = require('multer');
const config = require('../config');
const crypto = require('crypto');

//TODO
var storageAudio = multer.diskStorage({
    destination: function(req, file, callback) {
        if (file.fieldname === 'audio_file') {
            
            req.body.original_filename = file.originalname;
            req.body.audio_mimetype = file.mimetype;
            return callback(null, config.UPLOAD_AUDIOS_PATH);
        }
        if (file.fieldname === 'cover') {
            req.body.cover_mimetype = file.mimetype;
            return callback(null, config.UPLOAD_COVERS_PATH);
        }
    },
    filename: function(req, file, callback) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (file.fieldname === 'audio_file') {
                req.body.new_filename = raw.toString('hex');
                    
            }
            if (file.fieldname === 'cover') {
                req.body.cover = raw.toString('hex');

            }
            callback(err, err ? undefined : raw.toString('hex'))
        })
    }
});

var uploadBoth = multer({
        storage: storageAudio
    })
    .fields([
        { name: 'cover', maxCount: 1 },
        { name: 'audio_file', maxCount: 1 }
    ]);

var uploadCover = multer({ dest: `${config.UPLOAD_COVERS_PATH}/` }).single('cover'); // multer configuration
var uploadAudio = multer({ dest: `${config.UPLOAD_AUDIOS_PATH}/` }).single('audio_file'); // multer configuration

var memoryStorage = multer.memoryStorage();
var uploadMetadata = multer({
      storage: memoryStorage
  }).single('audio_file');

module.exports = {
    both : uploadBoth,
    cover : uploadCover,
    audio : uploadAudio,
    metadata : uploadMetadata
};
