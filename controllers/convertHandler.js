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
    let num = input.match(/\-?\d+\.?\d*([\/]\d+\.?\d*)*/g);
    num = num && num[0] ? num[0] : null;

    if (!num) {
      return 1;
    }

    if (num.split('/').length > 2) {
      return null;
    }

    return eval(num);
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

    // gal-L
    if (initUnit === 'gal' && returnUnit === 'l') {
      return initNum * galToL;
    }

    if (initUnit === 'l' && returnUnit === 'gal') {
      return initNum / galToL;
    }

    // lbs-Kg
    if (initUnit === 'lbs' && returnUnit === 'kg') {
      return initNum * lbsToKg;
    }

    if (initUnit === 'kg' && returnUnit === 'lbs') {
      return initNum / lbsToKg;
    }

    // mi-Km
    if (initUnit === 'mi' && returnUnit === 'km') {
      return initNum * miToKm;
    }

    if (initUnit === 'km' && returnUnit === 'mi') {
      return initNum / miToKm;
    }

    return null;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
