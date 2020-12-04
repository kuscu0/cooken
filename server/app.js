const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const DBConnection = require('./db/Connection');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const localDB = new DBConnection("mongodb://127.0.0.1:27017");

app.set('DB', localDB);

app.use('/', indexRouter);
app.use('/users', usersRouter);

console.log("Up and running")

module.exports = app;
