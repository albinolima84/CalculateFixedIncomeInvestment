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
    let tcdi = 0;
    let cdiRate = 0;
    let cdiByCdbRate = 0;
    let yield = 0;
    let unitPrice = investmentValue;

    rates.forEach(element => {
        cdiRate = element.rateValue;
        tcdi = toFixedNumber((Math.pow(1 + (cdiRate / 100), rateBusinessDayPerYear) - 1), 8);
        cdiByCdbRate = tcdi * (cdbRate / 100);

        unitPrice += yield;

        ratesInPeriod.push({date: element.rateDate, unitPrice: toFixedNumber(unitPrice, 2)});

        yield = toFixedNumber(unitPrice * cdiByCdbRate, 16);
    });
    
    return ratesInPeriod.sort((a,b) => (a.date > b.date) ? -1 : 1);
};

toFixedNumber = (num, digits, base) => {
    var pow = Math.pow(base||10, digits);
    return Math.round(num*pow) / pow;
};