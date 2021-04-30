const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

router.get("/", asyncHandler(async (req, res) => {
    let DB = req.app.get('DB');
    let queryBuffer = {};
    if (req.query.title) {
        DB.search.byTitle(queryBuffer, req.query.title);
    }
    if (req.query.minRating) {
        DB.search.byRating(queryBuffer, req.query.minRating);
    }
    if (req.query.maxTime) {
        DB.search.byTime(queryBuffer, req.query.maxTime)
    }
    if (req.query.maxDifficulty) {
        DB.search.byDifficulty(queryBuffer, req.query.maxDifficulty)
    }
    if (req.query.ingredient) {
        await DB.search.byIngredient(queryBuffer, req.query.ingredient);
    }
    if (req.query.tag) {
        DB.search.byTag(queryBuffer, req.query.tag);
    }
    if (JSON.stringify(queryBuffer) === "{}") {
        res.status(422).send("Bad Request Parameter");
    }
    try {
        const search = await DB.search.startSearch(queryBuffer);
        res.json(search);
    }
    catch (e) {
        res.status(400).json({ error: "Search failed" })
    }

}));

module.exports = router;
