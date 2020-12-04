const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', asyncHandler(async (req, res, next) => {
    let DB = req.app.get('DB');
    try {
        res.send(await DB.createUser(req.body.name, req.body.password, req.body.email));
    }
    catch (e) {
        res.status(e.statusCode || 500).json(e);
        console.error(e);
    }
}));

router.post('/update', asyncHandler(async (req, res, next) => {
    let DB = req.app.get('DB');
    try {
        res.send(await DB.updateUser(req.body.name, req.body.password, req.body.email));
    }
    catch (e) {
        res.status(e.statusCode || 500).json(e);
        console.error(e);
    }
}));

router.post('/remove', asyncHandler(async (req, res, next) => {
    let DB = req.app.get('DB');
    try {
        res.send(await DB.removeUser(req.body.email));

    }
    catch (e) {
        res.status(e.statusCode || 500).json(e);
        console.error(e);
    }
}));

router.post('/check', asyncHandler(async (req, res, next) => {
    let DB = req.app.get('DB');
    try {
        res.send(await DB.checkUser(req.body.email, req.body.password));
    }
    catch (e) {
        res.status(e.statusCode || 500).json(e);
        console.error(e);
    }
}));

module.exports = router;
