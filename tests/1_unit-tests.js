const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  expect(convertHandler.getNum('1gal')).to.eql(1);
  expect(convertHandler.getNum('1.1km')).to.eql(1.1);
  expect(convertHandler.getNum('1/2lbs')).to.eql(0.5);
  expect(convertHandler.getNum('1.5/2mi')).to.eql(0.5);
  xpect(convertHandler.getNum('3/2/3lbs')).to.eql(0.5);
  expect(convertHandler.getNum('kg')).to.eql(1);
  expect(convertHandler.getUnit('4gal')).to.eql('L');
  expect(convertHandler.getUnit('4gals')).to.eql('kg');
  expect(convertHandler.getReturnUnit('gal')).to.eql('l');
  expect(convertHandler.spellOutUnit('gal')).to.eql('l');
  expect(convertHandler.convert('gal')).to.eql(3.78541);
  expect(convertHandler.convert('L')).to.eql(0.26417);
  expect(convertHandler.convert('mi')).to.eql(1.60934);
  expect(convertHandler.convert('km')).to.eql(0.62137);
  expect(convertHandler.convert('lbs')).to.eql(0.45359);
  expect(convertHandler.convert('kg')).to.eql(2.20462);
});