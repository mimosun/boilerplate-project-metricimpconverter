const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Convert a valid input', function(done) {
    chai.request(server)
      .keepOpen()
      .get('/api/convert?input=10L')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.returnNum, '2.64172');
        assert.equal(res.body.returnUnit, 'gal');
        done();
      });
  });

  test('Convert an invalid input', function(done) {
    chai.request(server)
      .keepOpen()
      .get('/api/convert?input=32g')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'invalid unit');
        done();
      });
  });

  test('Convert an invalid number', function(done) {
    chai.request(server)
      .keepOpen()
      .get('/api/convert?input=3/7.2/4kg')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'invalid number');
        done();
      });
  });

  test('Convert an invalid number AND unit', function(done) {
    chai.request(server)
      .keepOpen()
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'invalid number and unit');
        done();
      });
  });

  test('Convert with no number', function(done) {
    chai.request(server)
      .keepOpen()
      .get('/api/convert?input=kg')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.returnNum, '2.20462');
        assert.equal(res.body.returnUnit, 'lbs');
        done();
      });
  });
});
