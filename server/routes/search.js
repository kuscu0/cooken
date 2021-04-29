const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

router.get("/", asyncHandler(async (req, res) => {
    let DB = req.app.get('DB');
    let queryBuffer = new Map();
    if(req.query.title){
        try {
            queryBuffer = await DB.search.byTitle(queryBuffer, req.query.title);
        } catch (e) {
            res.status(500).send(e);
        }
    } if(req.query.minRating) {
        try {
            queryBuffer = await DB.search.byRating(queryBuffer, req.query.minRating);
        } catch (e) {
            res.status(500).send(e);
        }
    } if(req.query.maxTime) {
        try {
            queryBuffer = await DB.search.byTime(queryBuffer, req.query.maxTime)
        } catch (e) {
            res.status(500).send(e);
        }
    } if(req.query.difficulty){
        try {
            queryBuffer = await DB.search.byDifficulty(queryBuffer, req.query.difficulty)
        } catch (e) {
            res.status(500).send(e);
        }
    } if(req.query.ingredient) {
        try {
            queryBuffer = await DB.search.byIngredient(queryBuffer, req.query.ingredient);
        } catch (e) {
            res.status(500).send(e);
        }
    } if(req.query.tag) {
        try {
            queryBuffer = await DB.search.byTag(queryBuffer, req.query.tag);
        } catch (e) {
            res.status(500).send(e);
        }
    } if(queryBuffer === {}) {
        res.status(422).send("Bad Request Parameter");
    }

    res.json(await DB.search.startSearch(queryBuffer));

}));

module.exports = router;
