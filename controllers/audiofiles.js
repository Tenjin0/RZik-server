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
        Audiofile.create(req.body)
            .then((audiofile) => {
                for (var i = 0; i < req.body.genres.length; i++) {
                    Genre.findById(req.body.genres[i])
                        .then((genre) => {
                            audiofile.addGenre(genre);
                        });
                }
                res.status(201).json(audiofile);
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