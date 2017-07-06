process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var fs= require('fs');
var should = chai.should();

var models = require('../server/models');
chai.use(require('chai-string'));
// var supertest  = require("supertest");
// var server = supertest.agent("http://localhost:3000");
chai.use(chaiHttp);

var jwt = require('jsonwebtoken');
var config = require('../server/config/config.js');
var token =  jwt.sign(1, config.secretKey)

var assert = chai.assert;

describe('Audiofile', function() {
    var users;

    before(function(done) {

        //TODO a metre dans un fichier initDB
        var asyncCount = 0;
        var total = 3;
        var innerCallback = (done) => {
            asyncCount++;
            if (asyncCount >= total) {
                models.User_Role.bulkCreate([{id_user: 1, id_role: 2}, 
                    {id_user: 1, id_role: 5}])
                .then(() => {
                    done();
                });
            }
        }
        models.sequelize.sync({ force: true, alter: true })
        .then(function() {
            models.User.create({
                id: 1, firstname: 'Patrice', lastname: 'Petit', nickname: 'Tenji',
                password: '$2a$08$YGVTzmyW9rMbisqGHARMPOcxabT2jRnZkfgDvps7LF03n1h8s/vaW', email: 'petitpatrice@gmail.com',
                birth_date: '1990-06-16',last_login: '2017-06-07 08:25:03', activated: true,deleted: null
            })
            .then((user) => {
                innerCallback(done);
            })

            var roles = [
                {id: 1, role: 'anonymous'},
                {id: 2, role: 'user'}, 
                {id: 3, role: 'moderator'},
                {id: 4, role: 'owner'},
                {id: 5, role: 'administrator'}]
            models.Role.bulkCreate(roles)
            .then(() => {
                innerCallback(done);
            })

            models.Gender.bulkCreate([{
                name: 'Hip hop',
            },{ name : 'Rock alternatif'}])
            .then(() => {
                innerCallback(done);
            })
        })
        .catch((err) => {
            console.warn(err);
            done()
        })
    })

    beforeEach(function(done) {
            done();
    });

    afterEach(function(done) {
        done();
    });

    it('should register an audiofile POST', function(done) {

        chai.request(server)
        .post('/api/audiofiles')
        // .set({'Content-Type': "application/json"})
        .set({'Authorization': token})
        .attach('cover', fs.readFileSync(__dirname + '/attach/cover.jpg'), 'cover.jpg')
        .attach('audio_file', fs.readFileSync(__dirname + '/attach/audio.mp3'), 'audio.mp3')
        .field( "title", "In the End")
        .field(  "artist", "Linkin Park")
        .field(  "composer", "Linkin Park")
        .field(  "creation_date", "2000-01-01")
        .field(  "duration","00:01:40")
        .field(  "genders", "1,2")
        .end(function(err, res){

            res.should.have.status(201);
            res.should.be.json;
            res.body.should.have.property("message");
            res.body.message.should.equal("audiofile_created_success");
            res.body.should.have.property("audiofile");
            res.body.audiofile.title.should.equal("In the End");
            res.body.audiofile.artist.should.equal("Linkin Park");
            res.body.audiofile.composer.should.equal("Linkin Park");
            res.body.audiofile.composer.should.equal("Linkin Park");
            res.body.audiofile.original_filename.should.equal('audio.mp3');
            res.body.audiofile.audio_mimetype.should.equal('audio/mpeg');
            res.body.audiofile.cover_mimetype.should.equal("image\/jpeg");
            res.body.audiofile.genders.should.be.a('array');
            
            done();
        });
    });

    it('should not register an audiofile POST', function(done) {

        chai.request(server)
        .post('/api/audiofiles')
        // .set({'Content-Type': "application/json"})
        .set({'Authorization': token})
        .field( "title", "In")
        .end(function(err, res){
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property("message");
            res.body.message.should.equal("audiofile_created_error");
            res.body.should.have.property("errors");
            res.body.errors.title.should.equal("title_at_least_3_characters");
            res.body.errors.artist.should.equal("artist cannot be null");
            res.body.errors.composer.should.equal("composer cannot be null");
            res.body.errors.cover.should.equal('cover cannot be null');
            res.body.errors.duration.should.equal('duration cannot be null');
            res.body.errors.audiofile.should.equal('audiofile_error');
            res.body.errors.genders.should.equal('none_genders_selected');
            
            done();
        });
    });
});
