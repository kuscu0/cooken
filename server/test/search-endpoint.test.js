//Integration Test for Searching Algorithm

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const describe = require('mocha').describe;
const it = require('mocha').it;

chai.use(chaiHttp);

function searchRequest(body) {
    return chai.request(app)
        .post('/search')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(body);
}

describe('Search Endpoint Testing', function () {
    this.timeout(10000);

    describe('Search by Title', () => {
        const body = {title: "Orangen"};
        it('Should Return Status Code 200', () => {
            return searchRequest(body).then(res => {
                expect(res.status).to.be.equal(200);
            });
        });

        it('Titles should include "Orangen"', () => {
            return searchRequest(body).then(res => {
                res.body.forEach(recipe => {
                    expect(recipe.title.toLowerCase()).to.contain('orangen');
                });
            });
        });
    });

    describe('Search by Min Rating', () => {
        const body = {minRating: 4.8};

        it('Should Return Status Code 200', () => {
            return searchRequest(body).then(res => {
                expect(res.status).to.be.equal(200);
            });
        });

        it('Rating of Results should be over or equal to 4.8', async () => {
            return searchRequest(body).then(async res => {
                res.body.forEach(recipe => {
                    expect(recipe.rating.rating).to.be.greaterThanOrEqual(4.8);
                });
            });
        });
    });

    describe('Search by Max Time', () => {
        const body = {maxTime: 10};
        it('Should Return Status Code 200', async () => {
            return searchRequest(body).then(res => {
                expect(res.status).to.be.equal(200);
            });
        });

        it('totalTime should be less or equal 10', async () => {
            return searchRequest(body).then(res => {
                res.body.forEach(recipe => {
                    expect(recipe.totalTime).to.be.lessThanOrEqual(10);
                })
            })
        });
    });

    describe('Search by Max Difficulty', () => {
        const body = {maxDifficulty: 1};
        it('Should Return Status Code 200', async () => {
            return searchRequest(body).then(res => {
                expect(res.status).to.be.equal(200);
            });
        });

        it('Difficulty should be less or equal 1', async () => {
            return searchRequest(body).then(res => {
                res.body.forEach(recipe => {
                    expect(recipe.difficulty).to.be.lessThanOrEqual(1);
                })
            })
        });
    });

    describe('Search by Ingredient', () => {
        const body = {ingredient: "Eigelb"};
        it('Should Return Status Code 200', async () => {
            return searchRequest(body).then(res => {
                expect(res.status).to.be.equal(200);
            });
        });

        it('Should have "Eigelb" as Ingredient', async () => {
            return searchRequest(body).then(res => {
                res.body.forEach(async recipe => {
                    expect(await checkForIngredient(recipe, 'Eigelb')).to.be.true;
                });
            });
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
        const body = {tag: "Schnell"};
        it('Should Return Status Code 200', async () => {
            return searchRequest(body).then(res => {
                expect(res.status).to.be.equal(200);
            });
        });

        it('Should have "Schnell" as Tag', async () => {
            return searchRequest(body).then(res => {
                res.body.forEach(async recipe => {
                    expect(await checkForTag(recipe, 'Schnell')).to.be.true;
                })
            })
        })
    });

    async function checkForTag(recipe, tagName) {
        for (const tag of recipe.fullTags) {
            if (tag.name === tagName) {
                return true;
            }
        }
        return false;
    }

    describe('Search by Two (Title and Min Rating)', () => {
        const body = {
            title: "Orangen",
            minRating: 4
        };
        it('Should Return Status Code 200', async () => {
            return searchRequest(body).then(res => {
                expect(res.status).to.be.equal(200);
            });
        });

        it('Title should be "Orangen" and Rating should be greater or equal 4', async () => {
            return searchRequest(body).then(res => {
                res.body.forEach(recipe => {
                    expect(recipe.title.toLowerCase()).to.contain('Orangen'.toLowerCase());
                    expect(recipe.rating.rating).to.be.greaterThanOrEqual(4);
                });
            });
        });
    });

    describe('Search by Multiple Filters', () => {
        const body = {
            title: "Orangen",
            minRating: 4,
            maxDifficulty: 2,
            maxTime: 30,
            tag: "Hauptspeise"
        };
        it('Should Return Status Code 200', async () => {
            return searchRequest(body).then(res => {
                expect(res.status).to.be.equal(200);
            });
        });

        it('Should have the configured Filters all matching', async () => {
            return searchRequest(body).then(res => {
                res.body.forEach(async recipe => {
                    expect(recipe.title).to.contain('Orangen');
                    expect(recipe.rating.rating).to.be.greaterThanOrEqual(4);
                    expect(recipe.difficulty).to.be.lessThanOrEqual(2);
                    expect(await checkForTag(recipe, 'Hauptspeise')).to.be.true;
                });
            });
        });
    });
});
