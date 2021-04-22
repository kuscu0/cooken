class SearchHandler {
    constructor(mongoClient) {
        this.client = mongoClient;
    }

    async byTitle(recipeTitle) {
        const recipesColl = (await this.client.connect()).db("cooken").collection("recipes");
        const query = { title: new RegExp(recipeTitle)}
        return recipesColl.find(query, { limit: 20 }).toArray();
    }

    async byRating(minRating) {
        const recipesColl = (await this.client.connect()).db("cooken").collection("recipes");
        const query = { "rating.rating": {$gte : parseFloat(minRating)}};    //$gte = greater than equal
        return recipesColl.find(query, { limit: 20 }).toArray();
    }

    async byTime(maxTime) {
        const recipesColl = (await this.client.connect()).db("cooken").collection("recipes");
        const query = { totalTime: { $lte : parseInt(maxTime)}};   //$lte = less than equal
        return recipesColl.find(query, { limit: 20 }).toArray();
    }

    async byDifficulty(maxDifficulty) {
        const recipesColl = (await this.client.connect()).db("cooken").collection("recipes");
        const query = { difficulty: { $lte : parseInt(maxDifficulty)}};
        return recipesColl.find(query, { limit: 20 }).toArray();
    }

    async byIngredient(ingredientName) {
        const recipesColl = (await this.client.connect()).db("cooken").collection("recipes");
        const ingredientsColl = (await this.client.connect()).db("cooken").collection("ingredients");
        const ingQuery = { name: new RegExp(ingredientName) };
        const ingredient = await ingredientsColl.findOne(ingQuery);
        const query = { "ingredientGroups.ingredients.id": ingredient._id };
        return recipesColl.find(query).toArray();
    }
}

module.exports = SearchHandler;