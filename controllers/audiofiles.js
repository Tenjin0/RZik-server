'use strict';
const model = require('../server/models/');
const Audiofile = model.Audiofile;
const AudioGenders = model.AudioGenders;
const Gender = model.Gender;
const Comment = model.Comment;
const Email = require('../helpers/mailer');
const config = require('../config.js');
const fse = require('fs-extra');
// const jsmediatags = require('jsmediatags');
const mm = require('musicmetadata');

const Duplex = require('stream').Duplex; 

function bufferToStream(buffer) {  
    let stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
}

var createAudioGender = (audiofile,idGenders, callback) => {
        if (typeof idGenders === 'string') {
            idGenders = JSON.parse(idGenders);
        }
        var genders = [];
        var count = 0;
        if (idGenders && idGenders.length > 0) {
            for (var i = 0; i < idGenders.length; i++) {
                Gender.findById(idGenders[i])
                
                    .then((gender) => {
                        audiofile.addGender(gender);
                        genders.push(gender);
                        count++;
                        if (count === idGenders.length) {
                            return callback(null , genders);
                        }
                    }).catch((error) => {
                        return callback(error)
                    })
            }
        } else {
            return callback(null, genders);
        }
}

const index = (req, res)  => {
    var opts = {
        include: [{
            model: Gender,
            attributes: ['id', 'name']
        }]
    }
     var opts = {
        include: [{
            model: Gender,
            attributes: ['id', 'name']
        }]
    }
    if (req.query.limit && req.query.offset) {
        opts.limit = parseInt(req.query.limit, 10);
        opts.offset = parseInt(req.query.offset, 10);;
    }
    Audiofile.findAll(opts)
        .then((audiofiles) => {
            res.status(200).json(audiofiles);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
};

const create = (req, res) => {
    if (!req.body.genders) {
        req.body.genders = [];
    }
    if (req.decoded) {
        req.body.id_user = req.decoded;
    }
    if (req.files && req.files.audio_file) {
        req.body.original_filename = req.files.audio_file[0].originalname;
        req.body.new_filename = req.files.audio_file[0].filename;
        req.body.mimetype = req.files.audio_file[0].mimetype;
    }
    if (req.files && req.files.cover) {
        req.body.cover = req.files.audio_file[0].filename;
    }
    Audiofile.create(req.body)
        .then((audiofile) => {
            createAudioGender(audiofile, req.body.genders, (err, genders) => {
                if (err) {
                    return res.status(500).json({message: 'audiofile_created_genders_error'});
                }
                audiofile.genders = genders;
                return res.status(201).send({message : 'audiofile_created_success', audiofile})
            })
        })
        .catch((error) => {
            res.status(500).json(error);
        })
};

const view = (req, res) => {
    Audiofile.find({
            id: req.params.id,
            include: [{
                model: Gender,
                attributes: ['id', 'name']
            }]
        })
        .then((audiofile) => {
            res.status(200).json(audiofile);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
};

const update = (req, res)  => {
    Audiofile.findById(req.params.id)
        .then(function(audiofile) {
            audiofile.save(req.body)
            .then((audiofile) => {
                AudioGenders.destroy({
                    where: {
                        id_audiofile: req.params.id
                    }
                }).then((az) => {
                    createAudioGender(audiofile, req.body.genders, (err, genders) => {
                        audiofile.genders = genders;
                        res.status(200).send(audiofile).end();
                    })
                }).catch((error) => {
                    res.status(500).send(error).end();
                })
            }).catch((error) => {
                res.status(500).send(error).end();
            })
        })
        .catch(function(error) {
            res.status(500).json(error);
        });
};

const deleteAudio =(req, res) => {
    Audiofile.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(deletedRecords) {
            res.status(200).json(deletedRecords);
        })
        .catch(function(error) {
            res.status(500).json(error);
        });
};

const stream = (req, res) => {
    if (req.params.id) {
        Audiofile.findById(req.params.id)
            .then((audiofile) => {
                fse.createReadStream(config.UPLOAD_PATH + '/' + audiofile.new_filename).pipe(res);
            })
            .catch((error) => {
                res.status(500).send().end();
            })
    }
}

const myuploads = (req, res) => {
     var opts = {
        where: [{ id_user : req.decoded }]
    }
    if (req.query.limit && req.query.offset) {
        opts.limit = parseInt(req.query.limit, 10);
        opts.offset = parseInt(req.query.offset, 10);;
    }
    Audiofile.findAll(opts)
    .then((audiofiles) => {
        res.status(200).send({message :'audiofile_myuploads_success', audiofiles})
    })
    .catch((error) => {
        res.status(500).send({message :'audiofile_myuploads_error'}).end();
    })
}

const viewComments = (req, res) => {
     var opts = {
        where: {
            id_audiofile : req.params.id
        }
    }
    if (req.query.limit && req.query.offset) {
        opts.limit = parseInt(req.query.limit, 10);
        opts.offset = parseInt(req.query.offset, 10);;
    }
    Comment.findAll(opts).then((comments) => {
        res.status(200).send({ message : 'comments_view_success', comments }).end();
    }).catch((error) => {
        res.status(500).send({ message : 'comments_view_success'}).end()
    })
}

const viewComment = (req, res) => {
     Comment.findAll({
        where: {
            id_audiofile : req.params.id,
            id : req.params.id_comment
        }
    }).then((comment) => {
        if (!comment) {
            return res.status(404).send({message : 'comment_not_found'}).end();
        }
        return res.status(200).send({message : 'comment_view_success', commment}).end();

    }).catch((error) => {
        res.status(500).send(error).end()
    })
}
const createComment = (req, res) => {
    req.body.id_audiofile = req.params.id;
    Comment.create(req.body)
    .then((createdComment) => {
        Email.send({}, (err) => {
            return res.status(201).send({message : 'comment_created_success', comment : createdComment}).end();
        })
    }).catch((error) => {
        res.status(500).send({message : 'comment_created_error'}).end();
    })
}
const updateComment = (req, res) => {
    Comment.update(req.body, {
        where: {
            id: req.params.id_comment
        }
    })
    .then(function(updatedComment) {
        res.status(200).json({message : 'comment_updated_success', comment : updatedComment});
    })
    .catch(function(error) {
        res.status(500).json({message : 'comment_updated_error'});
    });
}

const deleteComment = (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id_comment
        }
    })
    .then(function(deletedRecords) {
        res.status(200).json(deletedRecords).end();
    })
    .catch(function(error) {
        res.status(500).json(error).end();
    });
}
const metadata = (req, res) => {
    var parser = mm(bufferToStream(req.file.buffer), function (err, metadata) {
        if (err) return res.status(500).send(err).end()
        console.log(metadata);
        return res.status(200).send({data : metadata}).end()
    });
}

module.exports = {
    index,
    view,
    create,
    update,
    delete : deleteAudio,
    stream,
    createComment,
    viewComments,
    viewComment,
    updateComment,
    deleteComment,
    myuploads,
    metadata
}
