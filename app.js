// Inserting default modules
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// Insert mongoose
let mongoose = require('mongoose');

// Setting routers
let viewRouter = require('./routes/view');
let apiRouter = require('./routes/api');

let app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connecting to mongo database
const url = 'mongodb://127.0.0.1:27017/phone-usage';
const connect = mongoose.connect(url);
// Returning message if correctly connected
connect.then(() => {
    console.log("Connected correctly to database");
}, (err) => {
    console.log(err);
});

app.use('/', viewRouter);
app.use('/usage', apiRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('pages/error');
});

module.exports = app;
