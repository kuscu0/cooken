const expect = require('chai').expect;
const request = require('request');

const endpoint = 'http://localhost:3000/search';

describe('Search by Title', () => {
    const uri = endpoint + '?title=Orangen'
    it('Should Return Status Code 200', () => {
        request(uri, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
        }) ;
    });
});

describe('Search by Min Rating', () => {
    const uri = endpoint + '?minRating=4.8'
    it('Should Return Status Code 200', () => {
        request(uri, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
        });
    });

    it('Rating of Results should be over or equal to 4.8', () => {
        request(uri, function (error, response, body) {
            body = JSON.parse(body);
            body.forEach(recipe => {
                it('should be true', (done) => {
                    expect(recipe.rating.rating < 4.8).to.be.true;
                    done();
                });
            });
        });
    });
});

describe('Search by Max Time', () => {
    const uri = endpoint + '?maxTime=10'
    it('Should Return Status Code 200', () => {
        request(uri, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
        }) ;
    });
});

describe('Search by Max Difficulty', () => {
    const uri = endpoint + '?maxDifficulty=1'
    it('Should Return Status Code 200', () => {
        request(uri, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
        }) ;
    });
});

describe('Search by Ingredient', () => {
    const uri = endpoint + '?ingredient=Eigelb'
    it('Should Return Status Code 200', () => {
        request(uri, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
        }) ;
    });
});

describe('Search by Tag', () => {
    const uri = endpoint + '?tag=Schnell'
    it('Should Return Status Code 200', () => {
        request(uri, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
        }) ;
    });
});

describe('Search by Title and Min Rating', () => {
    const uri = endpoint + '?title=Orangen&minRating=4'
    it('Should Return Status Code 200', () => {
        request(uri, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
        }) ;
    });
});

describe('Search by Multiple Filters', () => {
    const uri = endpoint + '?title=Orangen&minRating=4&maxDifficulty=2&maxTime=30&tag=Hauptspeise'
    it('Should Return Status Code 200', () => {
        request(uri, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
        }) ;
    });
});