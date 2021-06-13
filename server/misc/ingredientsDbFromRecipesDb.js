const MongoClient = require("mongodb").MongoClient;


MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true, useUnifiedTopology: true}).then(async db => {
	const recipes = db.db("cooken").collection("recipesNew");
	const ingredients = db.db("cooken").collection("ingredients");
	console.log("connected to db");
	let i = 0;
	const allIds = await ingredients.find().map(ingredient => ingredient._id).toArray();
	console.log(`found ${allIds.length} existing ingredients`);
	console.log("collecting ingredients...");
	const newIngredients = [];
	await recipes.find().forEach(
		recipe => {
			process.stdout.write(`\x1Bc\r recipe nr: ${++i}; newIngredients: ${newIngredients.length}`);
			recipe.ingredientGroups.forEach(
				group => group.ingredients
					// .filter(ingredient => !allIds.includes(ingredient.id))
					.forEach(ingredient => {
						if (allIds.includes(ingredient.id))
							return;
						allIds.push(ingredient.id);
						newIngredients.push({
							_id: ingredient.id,
							name: ingredient.name,
							category: ingredient.category || "Sonstiges",
						});
					})
			);
		}
	);
	console.log("inserting ingredients");
	await ingredients.insertMany(newIngredients);
	console.log("done");
	process.exit();
	// recipes.find().forEach(
	// 	recipe => recipe.ingredientGroups.forEach(
	// 		group => group.ingredients.forEach(ingredient => {
	// 			ingredients.replaceOne(
	// 				{
	// 					_id: ingredient.id,
	// 				},
	// 				{
	// 					_id: ingredient.id,
	// 					name: ingredient.name,
	// 					category: ingredient.category || "Sonstiges",
	// 				},
	// 				{
	// 					upsert: true
	// 				}
	// 			)
	// 				.then(res => process.stdout.write(`\x1Bc\r ${++i}`));
	// 		})
	// 	)
	// );
});