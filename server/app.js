var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var DBConnection = require('./db/Connection')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var recipesRouter = require('./routes/recipes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

var localDB = new DBConnection("mongodb://127.0.0.1:27017");

var testRecipe = {
    title: "TestRecipe",
    subTitle: "TestSubTitle",
    rating: 3,
    difficulty: 10,
    time: 30,
    siteUrl: "http://www.soulback.de",
    tags: ["Tag1", "Tag2", "Tag3"],
    servings: 2,
    instructions: "I don't know, just eat hard boiled eggs",
    ingredientGroups: ["Roastbeef", "Hühnchen", "Pizza"]
}

//localDB.createRecipe(testRecipe).then(r => console.log(r));

app.set('DB', localDB);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);

console.log("Up and running")

module.exports = app;
