//Integration Test for Searching Algorithm

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = chai.assert;

chai.use(chaiHttp);

describe('Search Endpoint Testing', function () {
    this.timeout(10000);

    describe('Ingredient groups', () => {
        it('Should Return Status Code 200', () => {
            return chai.request(app).get("/recipe/ingredientGroups").then(res => {
                expect(res.status).to.be.equal(200);
            });
        });

        it('Has correct schema', () => {
            return chai.request(app).get("/recipe/ingredientGroups").then(res => {
                const data = res.body;
                assert("ingredientGroups" in data);
                for (const group of data["ingredientGroups"]) {
                    assert(typeof group["_id"] === "string");
                    for (const ingredient of group["ingredients"]) {
                        assert(!isNaN(parseInt(ingredient["id"])));
                        assert(typeof ingredient["name"] === "string");
                    }
                }
            });
        });
    });

    describe("Recipe Data", () => {
        const recipeIds = [
            "1218391227356456",
            "814121185712740",
            "662351168076093",
            "504411145461802"
        ];

        it("Has right props", () => {
            return Promise.all(recipeIds.map(id => chai.request(app)
                .get(`/recipe/recipe/${id}`)
                .then(res => {
                    assert(res.status === 200);
                    const data = res.body;
                    assert("title" in data);
                    assert("ingredientGroups" in data);
                    assert("instructions" in data);
                })
            ))
        })
    })
});
