const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const index = require('./routes/index');
const users = require('./routes/user');
const audiofiles = require('./routes/audiofiles');
const genders = require('./routes/genders');
const playlist = require('./routes/playlist');
const test = require('./routes/test');

const verify = require('./middlewares/verify');
const app = express();
var passport = require('passport');

// var Models
var models = require("./server/models");

// var Routes

app.use(cors());
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cookieParser());
// TODO check authentification

var env = require('dotenv').load();
//Sync Database
// models.sequelize.sync().then(function() {
//   console.log('Nice! Database looks fine')
// }).catch(function(err) {
//   console.log(err, "Something went wrong with the Database Update!")
// });

// passport init
app.use(passport.initialize());

//load passport strategies
require('./server/config/passport/passport.js')(passport, models.User);

//Routes
require('./routes/auth.js')(app);

// app.use('/api/*', verify.verifyUser, function(req, res, next) {
//     next();
// })
// app.get('/', index);

app.use('/api/users', users);
app.use('/api/test', test);
app.use('/api/genders', genders);
app.use('/api/playlist', playlist);
app.use('/api/audiofiles', function(req, res, next) {
        next();
    },
    audiofiles);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json({ message: 'error' });
});

module.exports = app;
