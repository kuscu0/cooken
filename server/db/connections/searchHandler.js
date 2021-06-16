// const aggTemplateFlattenIngredientIds = [
//     {
//         '$addFields': {
//             'tmp': '$ingredientGroups.ingredients.id'
//         }
//     },
//     {
//         '$unwind': '$tmp'
//     },
//     {
//         '$unwind': '$tmp'
//     },
//     {
//         '$group': {
//             '_id': '$_id',
//             'ingredientsIds': {
//                 '$addToSet': '$tmp'
//             },
//             'tmpDoc': {
//                 '$first': '$$ROOT'
//             }
//         }
//     },
//     {
//         '$replaceRoot': {
//             'newRoot': {
//                 '$mergeObjects': [
//                     '$tmpDoc', {
//                         'ingredientsIds': '$ingredientsIds'
//                     }
//                 ]
//             }
//         }
//     },
//     {
//         '$unset': 'tmp'
//     }
// ];

const aggTemplateFromMyIngredients = {
    '$match': {
        'ingredientsIds': {
            $not: {
                $elemMatch: {
                    $nin: []
                }
            }
        }
    }
};

const aggTemplateSortByRating = [
    {
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
    },
    {
        '$sort': {
            'sortScore': -1
        }
    }
];

const aggTemplatePagination = [
    {
        '$skip': 0
    },
    {
        '$limit': 20,
    }
];

const aggTemplateMatchQuery = {
    '$match': {}
};

function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

class SearchHandler {
    constructor(mongoClient) {
        this.matchQuery = {};
        this.page = 0;
        this.myIngredients = [];
        this.client = mongoClient;
    }

    byTitle(recipeTitle) {
        this.matchQuery.title = new RegExp(recipeTitle, "i");
    }

    byRating(minRating) {
        this.matchQuery["rating.rating"]= { $gte: parseFloat(minRating) };     // $gte = greater than equl
    }

    byTime(maxTime) {
        this.matchQuery.totalTime = { $lte: parseInt(maxTime) };             // $lte = less than equl
    }

    byDifficulty(maxDifficulty) {
        this.matchQuery.difficulty = { $lte: parseInt(maxDifficulty) };
    }

    byIngredientsArray(ingredientsArray) {
        if (!ingredientsArray.length)
            return;
       this.myIngredients = ingredientsArray;
    }

    byTag(tagName) {
        this.matchQuery['fullTags.name'] = tagName;
    }

    setPage(page) {
        if (page >= 0) {
            this.page = page;
        }
    }

    async startSearch() {
        const recipesColl = (await this.client.connect()).db("cooken").collection("recipesNew");
        const aggregateQuery = [];

        const matches = cloneObject(aggTemplateMatchQuery);
        matches.$match = this.matchQuery;
        aggregateQuery.push(matches);

        if (this.myIngredients.length > 0) {
            // aggregateQuery.push(...cloneObject(aggTemplateFlattenIngredientIds));
            const myIngredientsFilter = cloneObject(aggTemplateFromMyIngredients);
            myIngredientsFilter.$match.ingredientsIds.$not.$elemMatch.$nin = this.myIngredients;
            aggregateQuery.push(myIngredientsFilter);
        }

        aggregateQuery.push(...cloneObject(aggTemplateSortByRating))

        const pagination = cloneObject(aggTemplatePagination);
        pagination[0].$skip = this.page * 20;
        aggregateQuery.push(...pagination);

        return recipesColl.aggregate(aggregateQuery, { allowDiskUse: true }).toArray();
    }
}

module.exports = SearchHandler;
