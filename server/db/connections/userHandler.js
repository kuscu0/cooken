class UserHandler {

    constructor(mongoClient) {
        this.client = mongoClient;
    }

    async getUserInventory(uid) {
        const inventoryColl = (await this.client.connect()).db("cooken").collection("inventory");
        let inventory = await inventoryColl.findOne({_id: uid});
        if (!inventory) {
            await inventoryColl.insertOne({_id: uid, ingredients: []});
            inventory = [];
        }
        return inventory.ingredients;
    }

    async addToInventory(uid, ingredient) {
        const inventoryColl = (await this.client.connect()).db("cooken").collection("inventory");
        let inventory = await inventoryColl.findOne({_id: uid});
        if (!inventory) {
            await inventoryColl.insertOne({_id: uid, ingredients: []});
            inventory = [];
        }
        if (await inventoryColl.findOne({_id: uid, ingredients: ingredient}))
            throw "Ingredient already added";
        inventory = await inventoryColl.updateOne(
            {
                _id: uid
            },
            {
                $push: {ingredients: ingredient}
            }
        );
        return "success"
    }

    async removeFromInventory(uid, ingredient) {
        const inventoryColl = (await this.client.connect()).db("cooken").collection("inventory");
        let inventory = await inventoryColl.findOne({_id: uid});
        if (!inventory) {
            await inventoryColl.insertOne({_id: uid, ingredients: []});
            inventory = [];
        }
        if (!await inventoryColl.findOne({_id: uid, ingredients: ingredient}))
            throw "Ingredient not in inventory";
        inventory = await inventoryColl.updateOne(
            {
                _id: uid
            },
            {
                $pull: {ingredients: ingredient}
            }
        );
        return "success";
    }

    async toggleRecipe(uid, recipeId) {
        const savedRecipesColl = (await this.client.connect()).db("cooken").collection("savedRecipes");
        if (!await savedRecipesColl.findOne({_id: uid})) {
            await savedRecipesColl.insertOne({_id: uid, savedRecipes: []});
        }
        if (await savedRecipesColl.findOne({_id: uid, savedRecipes: recipeId})) {
            await savedRecipesColl.updateOne(
                {
                    _id: uid,
                },
                {
                    $pull: {savedRecipes: recipeId}
                }
            );
            return false;
        }
        else {
            await savedRecipesColl.updateOne(
                {
                    _id: uid,
                },
                {
                    $push: {savedRecipes: recipeId}
                }
            );
            return true;
        }
    }

    async isSavedRecipe(uid, recipeId) {
        const savedRecipesColl = (await this.client.connect()).db("cooken").collection("savedRecipes");
        if (!await savedRecipesColl.findOne({_id: uid})) {
            await savedRecipesColl.insertOne({_id: uid, savedRecipes: []});
            return false;
        }

        return Boolean(await savedRecipesColl.findOne({_id: uid, savedRecipes: recipeId}));

    }

    async getSavedRecipes(uid) {
        const savedRecipesColl = (await this.client.connect()).db("cooken").collection("savedRecipes");
        const recipesColl = (await this.client.connect()).db("cooken").collection("recipesNew");
        const savedRecipes = await savedRecipesColl.findOne({ _id: uid });
        if (!savedRecipes)
            throw "No saved recipes found";
        return recipesColl.find({_id: {$in: savedRecipes.savedRecipes || []}}).toArray();
    }
}

module.exports = UserHandler;