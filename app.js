require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
var jwtAuth = require('socketio-jwt-auth');

const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

const app = express();

const SocketServer = require('socket.io')
const io = new SocketServer();

io.use(
  jwtAuth.authenticate({
    secret: process.env.JWT_SECRET,
    algorithm: 'HS256',
    handshake: true
  }, (payload, done) => {
    if (!payload) {
      return done({error: 'unauthorize'});
    }

    return done(null, {data: 'test'});
  })
);

app.set('io', io);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));

// initialize my socketio module and pass it io instance
require('./sockets/index')(io);

app.use('/products', productsRouter);
app.use('/users', usersRouter);

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
  // res.render('error');
  res.send({success: false});
});

module.exports = app;
