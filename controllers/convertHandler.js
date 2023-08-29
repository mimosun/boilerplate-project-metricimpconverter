function ConvertHandler() {

  const units = {
    gal: {
      target: 'l',
      spellout: 'gallons'
    },
    l: {
      target: 'gal',
      spellout: 'liters'
    },
    lbs: {
      target: 'kg',
      spellout: 'pounds'
    },
    kg: {
      target: 'lbs',
      spellout: 'kilograms'
    },
    mi: {
      target: 'km',
      spellout: 'miles'
    },
    km: {
      target: 'mi',
      spellout: 'kilometers'
    }
  }

  this.getNum = function(input) {
    // /\-?\d+\.?\d*([\/]\d+\.?\d*)*/g
    let num = input.match(/[\-\d\.\/]/g);
    num = num && num.length ? num.join('') : null;

    if (!num) {
      return 1;
    }

    if (num.split('/').length > 2) {
      return null;
    }

    try {
      return eval(num);
    } catch (err) {
      return null;
    }

  };

  this.getUnit = function(input) {
    let unit = input.match(/[a-zA-Z]+/);
    unit = unit ? unit[0].toLowerCase() : null;

    if (!unit || !Object.keys(units).includes(unit)) {
      return null;
    }

    return unit;
  };

  this.getReturnUnit = function(initUnit) {
    return units[initUnit]['target'] ?? '';
  };

  this.spellOutUnit = function(unit) {
    return units[unit]['spellout'] ?? '';
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const returnUnit = this.getReturnUnit(initUnit);
    let returnNum = 0;

    // gal-L
    if (initUnit === 'gal' && returnUnit === 'l') {
      returnNum = initNum * galToL;
    }

    // L-gal
    else if (initUnit === 'l' && returnUnit === 'gal') {
      returnNum = initNum / galToL;
    }

    // lbs-Kg
    else if (initUnit === 'lbs' && returnUnit === 'kg') {
      returnNum = initNum * lbsToKg;
    }

    else if (initUnit === 'kg' && returnUnit === 'lbs') {
      returnNum = initNum / lbsToKg;
    }

    // mi-Km
    else if (initUnit === 'mi' && returnUnit === 'km') {
      returnNum = initNum * miToKm;
    }

    else if (initUnit === 'km' && returnUnit === 'mi') {
      returnNum = initNum / miToKm;
    }

    return Number.isInteger(returnNum) ? returnNum : parseFloat(returnNum.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
