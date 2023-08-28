const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  chai.request(server)
    .get('/api/convert?input=10L')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('returnNum').eql('2.64172');
      res.body.should.have.property('returnUnit').eql('gal');
      done();
    });

  chai.request(server)
    .get('/api/convert?input=32g')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('error').eql('invalid unit');
      done();
    });

  chai.request(server)
    .get('/api/convert?input=3/7.2/4kg')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('error').eql('invalid number');
      done();
    });

  chai.request(server)
    .get('/api/convert?input=3/7.2/4kilomegagram')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('error').eql('invalid number and unit');
      done();
    });

  chai.request(server)
    .get('/api/convert?input=kg')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('returnNum').eql('2.20462');
      res.body.should.have.property('returnUnit').eql('lbs');
      done();
    });
});
