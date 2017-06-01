Audiofile = require('../models/').Audiofile;
Genre = require('../models/').Genre;

module.exports = {
    index(req, res) {
        req.db.Audiofile.findAll({
                include: [{
                    model: req.db.Genre,
                    attributes: ['id', 'name']
                }]
            })
            .then((audiofiles) => {
                res.status(200).json(audiofiles);
            })
            .catch((error) => {
                res.status(500).json(error);
            })
    },

    create(req, res) {
        if (!req.body.genres) {
            req.body.genres = [];
        }
        if (req.files && req.files.audio_file[0]) {
            req.body.original_filename = req.files.audio_file[0].originalname;
            req.body.new_filename = req.files.audio_file[0].filename;
            req.body.mimetype = req.files.audio_file[0].mimetype;
        }
        if (req.files && req.files.cover[0]) {
            req.body.cover = req.files.audio_file[0].filename;
        }
        Audiofile.create(req.body)
            .then((audiofile) => {
                var count = 0;
                if (req.body.genres.length > 0) {
                    conole.warn(count, req.body.genres.length, req.body.genres);
                    for (var i = 0; i < req.body.genres.length; i++) {
                        Genre.findById(req.body.genres[i])
                            .then((genre) => {
                                audiofile.addGenre(genre);
                                count++;
                                if (count === req.body.genres.length) {
                                    return res.status(201).json(audiofile);
                                }
                            });
                    }

                } else {
                    res.status(201).send(audiofile).end();
                }

            })
            .catch((error) => {
                res.status(500).json(error);
            })
    },

    view(req, res) {
        Audiofile.find({
                id: req.params.id,
                include: [{
                    model: req.db.Genre,
                    attributes: ['id', 'name']
                }]
            })
            .then((audiofile) => {
                res.status(200).json(audiofile);
            })
            .catch((error) => {
                res.status(500).json(error);
            })
    },
    update(req, res) {
        Audiofile.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            .then(function(updatedRecords) {
                res.status(200).json(updatedRecords);
            })
            .catch(function(error) {
                res.status(500).json(error);
            });
    },
    delete(req, res) {
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
    }
}