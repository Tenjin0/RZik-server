'use strict';

const Gender = require('../server/models/').Gender;

const index = (req, res) => {
    Gender.findAll().
    then((genders) => {
        res.status(200).send(genders).end();
    }).catch((error) => {
        res.status(500).send(error).end();
    })
}

module.exports = {
    index
}


