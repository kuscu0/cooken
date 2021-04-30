const chai = require('chai');
const chaiHttp = require('chai-http');
const mocha = require('mocha');
const app = require('../app');

const describe = mocha.describe;
const it = mocha.it;
const expect = chai.expect;

const authEndpoint = '/auth';
const userEndpoint = '/user';
let authToken;

chai.use(chaiHttp);

describe('Authentication Endpoint Testing', () => {
   it('Should create a User', async () => {
       await chai.request(app)
           .put(authEndpoint)
           .send({
              name: 'Testuser',
              email: 'example@mail.de',
              password: 'langeweile123'
           }).then(res => {
               expect(res.status).to.be.equal(200);
           });
   });

   it('Should be able to log in', async () => {
       await chai.request(app)
           .post(authEndpoint + '/login')
           .send({
               email: 'example@mail.de',
               password: 'langeweile123'
           }).then(res => {
               expect(res.status).to.be.equal(200);
               expect(res.body.token).to.exist;
               authToken = res.body.token;
           });
    });

    it('Should be able to put item in users inventory', async () => {
        await chai.request(app)
            .put(userEndpoint)
            .auth(authToken, {type: "bearer"})
            .send({
                ingredient: {"_id":"8333","name":"Bratwürste","category":"Fleisch und Wurstwaren"}
            })
            .then(res => {
                expect(res.status).to.be.equal(200);
            });
    });

   it('Should be able to get users inventory', async () => {
       await chai.request(app)
           .get(userEndpoint)
           .auth(authToken, {type: "bearer"})
           .then(res => {
               console.log(res);
               expect(res.status).to.be.equal(200);
           });
   });

   it('Should modify User', async () => {
       await chai.request(app)
           .patch(authEndpoint)
           .send({
               name: 'BananenBernd',
               email: 'example@mail.de',
               password: 'langeweile345'
           }).then(res => {
               expect(res.status).to.be.equal(200);
           });
   });

   it('Should delete User', async () => {
       await chai.request(app)
           .delete(authEndpoint)
           .send({email: 'example@mail.de'})
           .then(res => {
               expect(res.status).to.be.equal(200);
           });
   });
});
