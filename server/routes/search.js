const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const SearchQuery = require("../db/connections/SearchHandler");

router.post("/", asyncHandler(async (req, res) => {
    const DB = req.app.get('DB');
    const searchHandler = DB.makeSearchHandler();
    console.log(req.body)
    if (req.body.title) {
        searchHandler.byTitle(req.body.title);
    }
    if (req.body.minRating) {
        searchHandler.byRating(req.body.minRating);
    }
    if (req.body.maxTime) {
        searchHandler.byTime(req.body.maxTime)
    }
    if (req.body.maxDifficulty) {
        searchHandler.byDifficulty(req.body.maxDifficulty)
    }
    if (req.body.onlyFromMyIngredients) {
        await searchHandler.byIngredientsArray(req.body.myIngredients);
    }
    if (req.body.tag) {
        searchHandler.byTag(req.body.tag);
    }
    let page = req.body.page;
    if (typeof page !== "number" || isNaN(page) || page < 0)
        page = 0;
    searchHandler.setPage(page);

    try {
        const search = await searchHandler.startSearch(page);
        res.json(search);
    }
    catch (e) {
        console.error(e)
        res.status(400).json({ error: "Search failed" })
    }
}));

module.exports = router;
