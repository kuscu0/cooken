const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../secets")

router.put('/', asyncHandler(async (req, res, next) => {
    let DB = req.app.get('DB');
    try {
        res.send(await DB.login.createUser(req.body.name, req.body.password, req.body.email));
    } catch (e) {
        res.status(e.statusCode || 500).json(e);
        console.error(e);
    }
}));

router.patch('/', asyncHandler(async (req, res, next) => {
    let DB = req.app.get('DB');
    try {
        res.send(await DB.login.updateUser(req.body.name, req.body.password, req.body.email));
    } catch (e) {
        res.status(e.statusCode || 500).json(e);
        console.error(e);
    }
}));

router.delete('/', asyncHandler(async (req, res, next) => {
    let DB = req.app.get('DB');
    try {
        res.send(await DB.login.removeUser(req.body.email));

    } catch (e) {
        res.status(e.statusCode || 500).json(e);
        console.error(e);
    }
}));

router.post("/login", asyncHandler(async (req, res, next) => {
    let DB = req.app.get('DB');
    const {email, password} = req.body;
    const foundUser = await DB.login.checkUser(email, password);
    if (foundUser) {
        res.json({
            token: jwt.sign(
                {uid: foundUser._id},
                jwtSecret,
                {
                    expiresIn: 60 * 60 * 24 * 7      // valid for 6 days
                }
            )
        });
    } else {
        res.status(401).send("Wrong credentials");
    }
}));

module.exports = router;