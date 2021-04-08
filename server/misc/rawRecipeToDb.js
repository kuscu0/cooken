const fs = require('fs');
const gracefulFs = require('graceful-fs');
// const fsp = gracefulFs.promises;
const MongoClient = require("mongodb").MongoClient;

const startRecipe = 0;
const lastRecipe = 10000;

MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true, useUnifiedTopology: true}).then(async db => {
	const recipes = db.db("cooken").collection("recipes");
	// await recipes?.drop();
	let i = 0;
	console.log("connected to db \n");
	console.log("finding files");
	const files = fs
		.readdirSync("./tmpRawRecipes/")/*.slice(startRecipe, lastRecipe)*/
		.filter(file => file.endsWith(".json"));
	console.log(`reading ${files.length} files`);
	console.log("reading files");
	const allRecipes = await Promise.all(files.map(file => {
		const recipeId = file.match(/[^.]+/)[0];
		return new Promise((resolve, reject) => gracefulFs.readFile("./tmpRawRecipes/" + file, "utf8", (err, data) => {
			if (err) {
				reject(err);
				return;
			}
			const rawRecipe = JSON.parse(data);
			process.stdout.write(`\x1Bc\r ${++i}`);
			resolve({
				_id: recipeId,
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
			});
		}));
	}));
	console.log("inserting to db");
	await recipes.insertMany(allRecipes);
	console.log("finished");
	process.exit();
});

