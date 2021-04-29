const expect = require('chai').expect;
const app = require('../app');
const request = require('supertest')('http://localhost:3000/search');

//TODO: Implement correct MongoDB Testing with automated Sever (supertest app instead of url)

describe('Search by Title', () => {
    const uri = '?title=Orangen'
    it('Should Return Status Code 200', async () => {
        const response = await request.get(uri);
        expect(response.status).to.equal(200);
    });

    it('Titles should include "Orangen"', async () => {
        const response = await request.get(uri);
        const recipes = response.body;
        recipes.forEach(recipe => {
            expect(recipe.title).to.contain('Orangen');
        })
    })
});

describe('Search by Min Rating', () => {
    const uri = '?minRating=4.8'
    it('Should Return Status Code 200', async () => {
        const response = await request.get(uri);
        expect(response.status).to.equal(200);
    });

    it('Rating of Results should be over or equal to 4.8', async () => {
        const response = await request.get(uri);
        const recipes = response.body;
        recipes.forEach(recipe => {
            expect(recipe.rating.rating).to.be.greaterThanOrEqual(4.8);
        });
    });
});

describe('Search by Max Time', () => {
    const uri = '?maxTime=10'
    it('Should Return Status Code 200', async () => {
        const response = await request.get(uri);
        expect(response.status).to.equal(200);
    });

    it('totalTime should be less or equal 10', async () => {
        const response = await request.get(uri);
        const recipes = response.body;
        recipes.forEach(recipe => {
            expect(recipe.totalTime).to.be.lessThanOrEqual(10);
        });
    });
});

describe('Search by Max Difficulty', () => {
    const uri = '?maxDifficulty=1'
    it('Should Return Status Code 200', async () => {
        const response = await request.get(uri);
        expect(response.status).to.equal(200);
    });

    it('Difficulty should be less or equal 1', async () => {
        const response = await request.get(uri);
        const recipes = response.body;
        recipes.forEach(recipe => {
            expect(recipe.difficulty).to.be.lessThanOrEqual(1);
        });
    });
});

describe('Search by Ingredient', () => {
    const uri = '?ingredient=Eigelb'
    it('Should Return Status Code 200', async () => {
        const response = await request.get(uri);
        expect(response.status).to.equal(200);
    });

    it('Should have "Eigelb" as Ingredient', async () => {
        const response = await request.get(uri);
        const recipes = response.body;
        for (const recipe of recipes) {
            expect(await checkForIngredient(recipe, 'Eigelb')).to.be.true;
        }
    });
});

async function checkForIngredient(recipe, ingredientName) {
    for (const ingredientGroup of recipe.ingredientGroups) {
        for (const ingredient of ingredientGroup.ingredients) {
            if (ingredient.name === ingredientName) {
                return true;
            }
        }
    }
    return false;
}

describe('Search by Tag', () => {
    const uri = '?tag=Schnell'
    it('Should Return Status Code 200', async () => {
        const response = await request.get(uri);
        expect(response.status).to.equal(200);
    });

    it('Should have "Schnell" as Tag', async () => {
        const response = await request.get(uri);
        const recipes = response.body;
        for (const recipe of recipes) {
            expect(await checkForTag(recipe, 'Schnell')).to.be.true;
        }
    })
});

async function checkForTag(recipe, tagName) {
    for (const tag of recipe.fullTags) {
        if (tag.name === tagName){
            return true;
        }
    }
    return false;
}

describe('Search by Two (Title and Min Rating)', () => {
    const uri = '?title=Orangen&minRating=4'
    it('Should Return Status Code 200', async () => {
        const response = await request.get(uri);
        expect(response.status).to.equal(200);
    });

    it('Title should be "Orangen" and Rating should be greater or equal 4', async () => {
        const response = await request.get(uri);
        const recipes = response.body;
        for (const recipe of recipes) {
            expect(recipe.title).to.contain('Orangen');
            expect(recipe.rating.rating).to.be.greaterThanOrEqual(4);
        }
    });
});

describe('Search by Multiple Filters', () => {
    const uri = '?title=Orangen&minRating=4&maxDifficulty=2&maxTime=30&tag=Hauptspeise'
    it('Should Return Status Code 200', async () => {
        const response = await request.get(uri);
        expect(response.status).to.equal(200);
    });

    it('Should have the configured Filters all matching', async () => {
        const response = await request.get(uri);
        const recipes = response.body;
        for (const recipe of recipes) {
            expect(recipe.title).to.contain('Orangen');
            expect(recipe.rating.rating).to.be.greaterThanOrEqual(4);
            expect(recipe.difficulty).to.be.lessThanOrEqual(2);
            expect(await checkForTag(recipe, 'Hauptspeise')).to.be.true;
        }
    })
});