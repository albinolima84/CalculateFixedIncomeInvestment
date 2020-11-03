const repository = require('../repositories/cdi-repository');
const businessDayPerYar = 252;
const rateBusinessDayPerYear = 1 / businessDayPerYar;

getRatesInterval = async(investmentDate, currentDate) => {
    let rates = await repository.getRates(investmentDate, currentDate);

    return rates;
};

exports.Calculate = async(investmentDate, currentDate, cdbRate, investmentValue) => {
    let rates = await getRatesInterval(investmentDate, currentDate);
    let ratesInPeriod = [];
    let cdiRateDay = 0;
    let cdiRate = 0;
    let cdiByCdbRate = 0;
    let yield = 0;
    let unitPrice = investmentValue;
    let cdbPercent = cdbRate / 100;

    rates.forEach(element => {
        cdiRate = element.rateValue;
        cdiRateDay = toFixedNumber((Math.pow(1 + (cdiRate / 100), rateBusinessDayPerYear) - 1), 8);
        cdiByCdbRate = cdiRateDay * cdbPercent;

        unitPrice += yield;

        ratesInPeriod.push({date: element.rateDate, unitPrice: toFixedNumber(unitPrice, 2)});

        yield = toFixedNumber(unitPrice * cdiByCdbRate, 16);
    });
    
    return ratesInPeriod;
};

toFixedNumber = (num, digits, base) => {
    var pow = Math.pow(base||10, digits);
    return Math.round(num*pow) / pow;
};