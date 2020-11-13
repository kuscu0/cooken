var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function (req, res, next) {
    let DB = req.app.get('DB');
    DB.createUser(req.body.name, req.body.password, req.body.email)
        .then(value => {
            res.send(value);
            console.log(value);
        }).catch(err => {
            res.status(err.statusCode || 500).json(err);
            console.log(err);
    });
});

router.post('/update', function (req, res, next) {
    let DB = req.app.get('DB');
    DB.updateUser(req.body.name, req.body.password, req.body.email)
        .then(value => {
            res.send(value);
            console.log(value);
        }).catch(err => {
            res.status(err.statusCode || 500).json(err);
            console.log(err);
    });
});

router.post('/remove', function (req, res, next) {
    let DB = req.app.get('DB');
    DB.removeUser(req.body.name)
        .then(value => {
            res.send(value);
            console.log(value);
        }).catch(err => {
            res.status(err.statusCode || 500).json(err);
            console.log(err);
    });
});

router.post('/check', function (req, res, next) {
    let DB = req.app.get('DB');
    DB.checkUser(req.body.name, req.body.password)
        .then(value => {
            res.send(value);
            console.log(value);
        }).catch(err => {
            res.status(err.statusCode || 512).json(err.name);
            console.log(err);
    });
});

module.exports = router;
