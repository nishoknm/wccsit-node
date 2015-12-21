var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var session = require('express-session');

var app = express();
mongoose.connect("mongodb://127.0.0.1:27017/nodelogin"); // connect to our database


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// required for passport
app.use(session({ secret: 'secretkey' })); // session secret
app.use(passport.initialize({}));
app.use(passport.session({})); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(express.static(path.join(__dirname, 'public')));

require('./routes/config/passport')(passport);
require('./routes/index')(app, passport);

module.exports = app;
