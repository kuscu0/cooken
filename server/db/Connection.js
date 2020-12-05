const MongoClient = require("mongodb").MongoClient;
const connectionErr = require("./connectionErr");
const bcrypt = require("bcrypt");

class Connection {
	saltRounds = 10

	constructor(uri) {
		this.client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
	}

	async hashPassword(password) {
		return await bcrypt.hash(password, this.saltRounds);
	}

	async checkPasswordValidity(password, hashedPassword) {
		return await bcrypt.compare(password, hashedPassword);
	}

	async createUser(usrName, usrPW, usrMail) {
		if (usrName === "")
			throw "User Name must not be empty";
		if (usrMail === "")
			throw "User E-Mail must not be empty";
		const hashedPw = await this.hashPassword(usrPW);
		const db = (await this.client.connect()).db("cooken");
		const existingUsers = await db.collection("users").find({email: usrMail});
		if (await existingUsers.count())
			throw "E-Mail unavailable";
		await db.collection("users").insertOne({
			name: usrName,
			email: usrMail,
			password: hashedPw,
		});
		return "success";
	}

	async updateUser(usrName, usrPW, usrMail) {
		const hashedPw = await this.hashPassword(usrPW);
		const db = (await this.client.connect()).db("cooken");
		await db.collection("users").updateOne(
			{
				email: usrMail
			},
			{
				name: usrName,
				email: usrMail,
				password: hashedPw,
			}
		);
		return "success";
	}

	async removeUser(usrMail) {
		const db = (await this.client.connect()).db("cooken");
		await db.collection("users").deleteOne(
			{
				email: usrMail
			}
		)
		return "success";
	}

	async checkUser(usrMail, usrPW) {
		const db = (await this.client.connect()).db("cooken");
		const result = await db.collection("users").findOne(
			{
				email: usrMail
			}
		);
		return await this.checkPasswordValidity(usrPW, result.password) ? result : null;
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

	async getRecipeData(recipeId) {
		const recipesColl = (await this.client.connect()).db("cooken").collection("recipes");
		const recipe = await recipesColl.findOne({_id: recipeId});
		if (!recipe)
			throw "Invalid ID";
		return recipe;
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
		const recipesColl = (await this.client.connect()).db("cooken").collection("recipes");
		const savedRecipes = await savedRecipesColl.findOne({ _id: uid });
		if (!savedRecipes)
			throw "No saved recipes found";
		return recipesColl.find({_id: {$in: savedRecipes.savedRecipes || []}}).toArray();
	}
}

module.exports = Connection;