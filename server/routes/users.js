var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function (req, res, next) {
    let DB = req.app.get('DB');
    DB.createUser(req.body.name, req.body.password, req.body.email);
    res.send("Success");
})

module.exports = router;
