class SearchHandler {
    constructor(mongoClient) {
        this.client = mongoClient;
    }

    byTitle(queryBuffer, recipeTitle) {
        queryBuffer['title'] = new RegExp(recipeTitle);
    }

    byRating(queryBuffer, minRating) {
        queryBuffer['rating.rating'] = {$gte: parseFloat(minRating)}; //$gte = greater than equl
    }

    byTime(queryBuffer, maxTime) {
        queryBuffer['totalTime'] = { $lte: parseInt(maxTime)};    //$lte = less than equl
    }

    byDifficulty(queryBuffer, maxDifficulty) {
        queryBuffer['difficulty'] = { $lte: parseInt(maxDifficulty)};
    }

    async byIngredient(queryBuffer, ingredientName) {
        const ingredientsColl = (await this.client.connect()).db("cooken").collection("ingredients");
        const ingQuery = { name: new RegExp(ingredientName) };
        const ingredient = await ingredientsColl.findOne(ingQuery);
        queryBuffer['ingredientGroups.ingredients.id'] = ingredient._id;
    }

    byTag(queryBuffer, tagName) {
        queryBuffer['fullTags.name'] = tagName;
    }

    async startSearch(queryBuffer) {
        const recipesColl = (await this.client.connect()).db("cooken").collection("recipes");
        return recipesColl.find(queryBuffer, { limit: 20 }).toArray();
    }
}

module.exports = SearchHandler;