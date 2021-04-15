const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

router.get("/ingredientGroups", asyncHandler(async (req, res, next) => {
    let DB = req.app.get('DB');
    res.json({ ingredientGroups: await DB.recipe.getIngredientGroups() });
}));

router.get("/*", asyncHandler(async (req, res, next) => {
    let DB = req.app.get('DB');
    try {
        res.json(await DB.recipe.getRecipeData(req.path.match(/[^/]*$/)[0]));
    }
    catch (e) {
        res.status(404).send(e);
    }
}));

module.exports = router;