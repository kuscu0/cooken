var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/create', function (req, res) {
    let DB = req.app.get('DB');
    DB.createRecipe(req.body.rData)
        .then(value => res.send(value))
        .catch(err => res.status(err.statusCode || 500).json(err));
});

router.post('/update', function (req, res) {
    let DB = req.app.get('DB');
    DB.updateRecipe(req.body.rData)
        .then(value => res.send(value))
        .catch(err => res.status(err.statusCode || 500).json(err));
});

router.post('/remove', function (req, res) {
    let DB = req.app.get('DB');
    DB.removeRecipe(req.body.title)
        .then(value =>res.send(value))
        .catch(err => res.status(err.statusCode || 500).json(err));
})

module.exports = router;