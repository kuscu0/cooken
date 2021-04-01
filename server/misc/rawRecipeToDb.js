const fs = require('fs');
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true, useUnifiedTopology: true}).then(async db => {
	const recipes = db.db("cooken").collection("recipes");
	let i = 0;
	console.log("connected to db \n");
	for (const file of fs.readdirSync("./tmpRawRecipes/")) {
		const rawRecipe = JSON.parse(fs.readFileSync("./tmpRawRecipes/" + file, "utf8"));
		recipes.replaceOne(
			{
				_id: file.match(/[^.]+/)[0]
			},
			{
				_id: file.match(/[^.]+/)[0],
				title: rawRecipe.title,
				rating: rawRecipe.rating,
				difficulty: rawRecipe.difficulty,
				hasImage: rawRecipe.hasImage,
				previewImageId: rawRecipe.previewImageId,
				createdAt: rawRecipe.createdAt,
				servings: rawRecipe.servings,
				instructions: rawRecipe.instructions,
				cookingTime: rawRecipe.cookingTime,
				restingTime: rawRecipe.restingTime,
				totalTime: rawRecipe.totalTime,
				fullTags: rawRecipe.fullTags,
				siteUrl: rawRecipe.siteUrl,
				ingredientGroups: rawRecipe.ingredientGroups.map(group => ({
					header: group.header,
					ingredients: group.ingredients.map(ingredient => ({
						id: ingredient.foodId,
						name: ingredient.name,
						category: ingredient.productGroup,
						unit: ingredient.unit,
						unitId: ingredient.unitId,
						amount: ingredient.amount,
						usageInfo: ingredient.usageInfo,
					}))
				})),
			},
			{
				upsert: true
			}
		)
			.then(res => process.stdout.write(`\x1Bc\r ${++i}`))
			.catch(er => console.log("error (probably a duplicate"));
	}
});

