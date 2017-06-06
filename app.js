const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const models = require('./models/');

const index = require('./routes/index');
const users = require('./routes/users');
const audiofiles = require('./routes/audiofiles');
const genders = require('./routes/genders');
const test = require('./routes/test');

const app = express();


const multer = require('multer');

// const UPLOAD_PATH = 'uploads';
// const upload = multer({ dest: `${UPLOAD_PATH}/` }) // multer configuration

app.use(cors());
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/profile', upload.single('cover'), (req, res) => {
//     console.warn(req.body);
//     console.warn(req.file);

//     res.status(200).send().end();
//     // try {
//     //     const col = await loadCollection(COLLECTION_NAME, db);
//     //     const data = col.insert(req.file);

//     //     db.saveDatabase();
//     //     res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
//     // } catch (err) {
//     //     res.sendStatus(400);
//     // }
// })
// app.use((req, res, next) => {
//     console.warn(req.body);
//     next();
// });
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cookieParser());
// TODO check authentification
app.use('/api/*', function(req, res, next) {
    // console.warn(req.body);
    next();
});


app.get('/', index);

app.use('/api/users', users);
app.use('/api/test', test);
app.use('/api/genders', genders);
app.use('/api/audiofiles', function(req, res, next) {
        console.warn('audiofiles', req.body);
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
    console.warn(err);
    // render the error page
    res.status(err.status || 500);
    res.json({ message: 'error' });
});

module.exports = app;
