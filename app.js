var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var cors = require("cors");
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

var db = require('./connection/connection');
db.connectDB();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var documentRouter = require('./routes/documentRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false "}));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// this is where we basically set up the controllers and give the path
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/documents', documentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
