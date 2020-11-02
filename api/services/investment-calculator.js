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
    let tdci_accumulated = 1;
    let tcdi = 0;
    let cdi = 0;

    rates.forEach(element => {
        cdi = element.rateValue;
        tcdi = toFixedNumber((Math.pow(1 + (cdi / 100), rateBusinessDayPerYear) - 1), 8);

        tdci_accumulated += toFixedNumber((tcdi * cdbRate / 100), 16);
        let unit_price = toFixedNumber((investmentValue * tdci_accumulated), 2);
        ratesInPeriod.push({date: element.rateDate, tcdi, tdci_accumulated, unit_price});
    });
    
    return ratesInPeriod;
};

toFixedNumber = (num, digits, base) => {
    var pow = Math.pow(base||10, digits);
    return Math.round(num*pow) / pow;
};