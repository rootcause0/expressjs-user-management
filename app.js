require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

//Session Middleware
app.use(session(
  {
    name: 'ExpressCookie',
    genid: function (req) {
      console.log('session id created');
      return uuidv4();
    }, // use UUIDs for session IDs
    secret: 'Shsh!Secret!',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, expires: 60000
    }
  }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(res.locals)
  res.json('error,please try again')
});

module.exports = app;
