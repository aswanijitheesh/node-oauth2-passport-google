const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');

chai.should();
chai.use(chaiHttp);

describe("GET index page", () => {
  it("render index page", (done) => {
    chai.request(server)
      .get("/")
      .end((err, response) => {
        response.should.have.status(200)
        done();
      });
  });
});
