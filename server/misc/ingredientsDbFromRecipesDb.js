const MongoClient = require("mongodb").MongoClient;


MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true, useUnifiedTopology: true}).then(async db => {
	const recipes = db.db("cooken").collection("recipes");
	const ingredients = db.db("cooken").collection("ingredients");
	let i = 0;
	recipes.find().forEach(
		el => el.ingredientGroups.forEach(
			group => group.ingredients.forEach(ingredient => {
				ingredients.replaceOne(
					{
						_id: ingredient.id,
					},
					{
						_id: ingredient.id,
						name: ingredient.name,
						category: ingredient.category,
					},
					{
						upsert: true
					}
				)
					.then(res => process.stdout.write(`\x1Bc\r ${++i}`));
			})
		)
	);
});