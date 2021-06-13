const Connection = require("./Connection");

class RecipeControl{
    constructor(MongoClient) {
        this.client = MongoClient;
    }

    createRecipe(rData){
        let client = this.client;
        return new Promise(function (resolve, reject){
            client.connect(err => {
                if (err) reject(err);
                const recipeCollection = client.db("cooken").collection("recipesNew");
                recipeCollection.insertOne({
                    title: rData.title,
                    subTitle: rData.subTitle,
                    rating: rData.rating,
                    difficulty: rData.difficulty,
                    time: rData.time,
                    siteUrl: rData.siteUrl,
                    tags: rData.tags,
                    servings: rData.servings,
                    instructions: rData.instructions,
                    ingredientGroups: rData.ingredientGroups,
                }, err => {
                    if (err) reject(err);
                    else resolve('success');
                });
            });
        });
    }

    updateRecipe(rData){
        let client = this.client;
        return new Promise(function (resolve, reject){
            client.connect(err => {
                if (err) reject(err);
                const recipeCollection = client.db("cooken").collection("recipesNew");
                recipeCollection.update({title: rData.title}, {
                    title: rData.title,
                    subTitle: rData.subTitle,
                    rating: rData.rating,
                    difficulty: rData.difficulty,
                    time: rData.time,
                    siteUrl: rData.siteUrl,
                    tags: rData.tags,
                    servings: rData.servings,
                    instructions: rData.instructions,
                    ingredientGroups: rData.ingredientGroups,
                }, err => {
                    if (err) reject(err);
                    else resolve('success');
                });
            });
        });
    }

    removeRecipe(title){
        let client = this.client;
        return new Promise(function (resolve, reject){
            client.connect(err => {
                if (err) reject(err);
                const recipeCollection = client.db("cooken").collection("recipesNew");
                recipeCollection.deleteOne({title: title}, err => {
                    if (err) reject(err);
                    else resolve('success');
                });
            });
        });
    }
}

module.exports = RecipeControl;