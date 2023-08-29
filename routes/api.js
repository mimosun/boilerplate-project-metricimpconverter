'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', function(req, res) {
    const input = req.query.input ? req.query.input.toLowerCase() : '';
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (!input || (!initNum && !initUnit)) {
      res.json({ error: 'invalid number and unit' });
      return;
    } else if (!initNum) {
      res.json({ error: 'invalid number' });
      return;
    } else if (!initUnit) {
      res.json({ error: 'invalid unit' });
      return;
    }

    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);

    if (!returnNum || !returnUnit) {
      res.json({ error: 'convert error' });
      return;
    }

    res.json({
      initNum: initNum,
      initUnit: initUnit === 'l' ? 'L' : initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit === 'l' ? 'L' : returnUnit,
      string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    });
  });

};
