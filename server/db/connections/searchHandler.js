class SearchHandler {
    constructor(mongoClient) {
        this.client = mongoClient;
    }

    async byTitle(queryBuffer, recipeTitle) {
        return queryBuffer.set('title', new RegExp(recipeTitle));
    }

    async byRating(queryBuffer, minRating) {
        return queryBuffer.set('rating.rating', {$gte: parseFloat(minRating)}); //$gte = greater than equal
    }

    async byTime(queryBuffer, maxTime) {
        return queryBuffer.set('totalTime', { $lte: parseInt(maxTime)});    //$lte = less than equal
    }

    async byDifficulty(queryBuffer, maxDifficulty) {
        return queryBuffer.set('difficulty', { $lte: parseInt(maxDifficulty)});
    }

    async byIngredient(queryBuffer, ingredientName) {
        const ingredientsColl = (await this.client.connect()).db("cooken").collection("ingredients");
        const ingQuery = { name: new RegExp(ingredientName) };
        const ingredient = await ingredientsColl.findOne(ingQuery);
        return queryBuffer.set('ingredientGroups.ingredients.id', ingredient._id);
    }

    async byTag(queryBuffer, tagName) {
        return queryBuffer.set('fullTags.name', tagName);
    }

    async startSearch(queryBuffer) {
        const recipesColl = (await this.client.connect()).db("cooken").collection("recipes");
        return recipesColl.find(queryBuffer, { limit: 20 }).toArray();
    }
}

module.exports = SearchHandler;