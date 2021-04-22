const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const DBConnection = require('./db/Connection');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');      //Router for user data
const loginRouter = require('./routes/login');      //Router for everything relevant for login.js/passwords
const recipeRouter = require('./routes/recipes');   //Router for recipe data
const searchRouter = require('./routes/search');    //Router for searching

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const localDB = new DBConnection("mongodb://127.0.0.1:27017");

app.set('DB', localDB);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', loginRouter);
app.use('/recipe', recipeRouter);
app.use('/search', searchRouter);

console.log("Up and running")

module.exports = app;
