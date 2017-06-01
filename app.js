var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var index = require('./routes/index');
const cors = require('cors');
var users = require('./routes/users');
var audiofiles = require('./routes/audiofiles');
var models = require('./models/');

var app = express();

// app.use((req, res, next) => {
//     console.warn('1', req.body);
//     next();
// });
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
// app.use((req, res, next) => {
//     console.warn("2", req.body);
//     next();
// });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// TODO check authentification
app.use('/api/*', function(req, res, next) {
    // console.warn(req.body);
    next();
});
app.use('/api/users', users);
app.use('/api/audiofiles', audiofiles);

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