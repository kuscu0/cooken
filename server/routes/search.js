const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

router.get("/", asyncHandler(async (req, res) => {
    let DB = req.app.get('DB');
    if(req.query.title){
        try {
            res.json(await DB.search.byTitle(req.query.title));
        } catch (e) {
            res.status(500).send(e);
        }
    } else if(req.query.minRating) {
        try {
            res.json(await DB.search.byRating(req.query.minRating));
        } catch (e) {
            res.status(500).send(e);
        }
    } else if(req.query.maxTime) {
        try {
            res.json(await DB.search.byTime(req.query.maxTime));
        } catch (e) {
            res.status(500).send(e);
        }
    } else if(req.query.difficulty){
        try {
            res.json(await DB.search.byDifficulty(req.query.difficulty));
        } catch (e) {
            res.status(500).send(e);
        }
    } else if(req.query.ingredient) {
        try {
            res.json(await DB.search.byIngredient(req.query.ingredient));
        } catch (e) {
            res.status(500).send(e);
        }
    }else {
        res.status(422).send("Bad Request Parameter");
    }

}));

module.exports = router;