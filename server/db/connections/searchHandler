class SearchHandler {
    constructor(mongoClient) {
        this.client = mongoClient;
    }

    async searchByTitle(recipeTitle) {
        const recipesColl = (await this.client.connect()).db("cooken").collection("recipes");
        const query = { title: new RegExp(recipeTitle)}
        return recipesColl.find(query).toArray();
    }
}

module.exports = SearchHandler;