const sortAndFilterQueryPreset = [
    {
        '$match': {}
    }, {
        '$addFields': {
            'sortScore': {
                '$divide': [
                    {
                        '$add': [
                            {
                                '$multiply': [
                                    2.5, '$rating.numVotes'
                                ]
                            }, {
                                '$multiply': [
                                    '$rating.rating', 3
                                ]
                            }
                        ]
                    }, {
                        '$add': [
                            '$rating.rating', 3
                        ]
                    }
                ]
            }
        }
    }, {
        '$sort': {
            'sortScore': -1
        }
    }, {
        '$skip': 0
    }, {
        '$limit': 20,
    }
];

class SearchHandler {
    constructor(mongoClient) {
        this.client = mongoClient;
    }

    byTitle(queryBuffer, recipeTitle) {
        queryBuffer['title'] = new RegExp(recipeTitle);
    }

    byRating(queryBuffer, minRating) {
        queryBuffer['rating.rating'] = {$gte: parseFloat(minRating)}; //$gte = greater than equl
    }

    byTime(queryBuffer, maxTime) {
        queryBuffer['totalTime'] = { $lte: parseInt(maxTime)};    //$lte = less than equl
    }

    byDifficulty(queryBuffer, maxDifficulty) {
        queryBuffer['difficulty'] = { $lte: parseInt(maxDifficulty)};
    }

    async byIngredient(queryBuffer, ingredientName) {
        const ingredientsColl = (await this.client.connect()).db("cooken").collection("ingredients");
        const ingQuery = { name: new RegExp(ingredientName) };
        const ingredient = await ingredientsColl.findOne(ingQuery);
        queryBuffer['ingredientGroups.ingredients.id'] = ingredient._id;
    }

    byTag(queryBuffer, tagName) {
        queryBuffer['fullTags.name'] = tagName;
    }

    async startSearch(queryBuffer, page = 0) {
        const recipesColl = (await this.client.connect()).db("cooken").collection("recipes");
        const aggregateQuery = JSON.parse(JSON.stringify(sortAndFilterQueryPreset));
        aggregateQuery[0]["$match"] = queryBuffer;
        if (page > 0) {
            aggregateQuery[3]["$skip"] = page * 20;
        }
        return recipesColl.aggregate(aggregateQuery).toArray();
    }
}

module.exports = SearchHandler;
