const {MongoClient} = require("mongodb");

(async () => {
    const client = new MongoClient("mongodb://127.0.0.1:27017", {useNewUrlParser: true, useUnifiedTopology: true});
    const recipesColl = (await client.connect()).db("cooken").collection("recipes_bu");

    const cursor = await recipesColl.aggregate(aggTemplateFlattenIngredientIds, {allowDiskUse: true});
    let next = null;
    do {
        next = await cursor.next();
    } while (next != null);

    console.log("\n Done!");
})()

const aggTemplateFlattenIngredientIds = [
    {
        '$addFields': {
            'tmp': '$ingredientGroups.ingredients.id'
        }
    },
    {
        '$unwind': '$tmp'
    },
    {
        '$unwind': '$tmp'
    },
    {
        '$group': {
            '_id': '$_id',
            'ingredientsIds': {
                '$addToSet': '$tmp'
            },
            'tmpDoc': {
                '$first': '$$ROOT'
            }
        }
    },
    {
        '$replaceRoot': {
            'newRoot': {
                '$mergeObjects': [
                    '$tmpDoc', {
                        'ingredientsIds': '$ingredientsIds'
                    }
                ]
            }
        }
    },
    {
        '$unset': 'tmp'
    },
    {
        $out : "recipesNew"
    }
];