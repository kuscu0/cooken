class RecipeHandler {
    constructor(mongoClient) {
        this.client = mongoClient;
    }

    async getIngredientGroups() {
        const db = (await this.client.connect()).db("cooken");
        return new Promise((resolve, reject) => {
            db.collection("ingredients").aggregate(
                [
                    {
                        '$group': {
                            '_id': '$category',
                            'ingredients': {
                                '$push': {id: "$_id", name: '$name'}
                            },
                            'count': {
                                '$sum': 1
                            }
                        }
                    },
                    {
                        '$sort': {
                            'count': -1
                        }
                    },
                    {
                        '$unset': "count"
                    }
                ],
                async (err, result) => {
                    resolve(await result.toArray())
                }
            );
        });
    }

    async getRecipeData(recipeId) {
        const recipesColl = (await this.client.connect()).db("cooken").collection("recipesNew");
        const recipe = await recipesColl.findOne({_id: recipeId});
        if (!recipe)
            throw "Invalid ID";
        return recipe;
    }
}

module.exports = RecipeHandler;