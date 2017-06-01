var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/user');
var app = express();

var passport = require('passport');
var session  = require('express-session');
var jwt = require('jsonwebtoken');

var exphbs = require('express-handlebars');

//For Handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// For Passport
app.use(session({
  secret: 'forbidden dog grey me',
  resave: true,
  saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

var env = require('dotenv').load();

//Models
var models = require("./server/models");

//Routes
var authRoute = require('./routes/auth.js')(app,passport);

//app.use('/', index);
app.get('/', function(req, res) {
  res.send('Welcome to Passport with Sequelize');
});
app.use('/users', users);
//var userRoute = require('./routes/user.js')(app);

//load passport strategies
require('./server/config/passport/passport.js')(passport, models.User);

//Sync Database
models.sequelize.sync({force:true}).then(function() {
  console.log('Nice! Database looks fine')
}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!")
});

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
  console.log(err.message + "this one");
});

module.exports = app;
