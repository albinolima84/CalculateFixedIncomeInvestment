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

    rates.forEach(element => {
        let cdi = element.rateValue;
        let tcdi = parseFloat((Math.pow(1 + (cdi / 100), rateBusinessDayPerYear) - 1).toFixed(8));

        tdci_accumulated += parseFloat((tcdi * cdbRate / 100).toFixed(16));
        let value = investmentValue * tdci_accumulated;
        ratesInPeriod.push({date: element.rateDate, tcdi, tdci_accumulated, value});
    });
    
    return ratesInPeriod;
};