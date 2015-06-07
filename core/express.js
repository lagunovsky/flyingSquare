var
    flash = require('connect-flash');
    express = require('express');
    path = require('path');
    cookieParser = require('cookie-parser');
    bodyParser = require('body-parser');
    config = require("nconf");
    passport = require('passport');
    session = require('express-session');

config.argv()
    .file({
        file: 'config.json'
    });

var app = express();
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: 'miay',
    name: 'session',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../public/')));

var index = require('../routes/index');
app.use('/', index);


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (config.get("debug")) {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}


module.exports = app;