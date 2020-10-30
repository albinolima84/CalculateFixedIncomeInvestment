const repository = require('../repositories/cdi-repository');
const businessDayPerYar = 252;
const rateBusinessPerYear = 1 / businessDayPerYar;

getRatesInterval = async(investmentDate, currentDate) => {
    let rates = await repository.getRates(investmentDate, currentDate);
    //rates = await repository.getAll();

    return rates
    .filter(function(item){
        return item.rateDate >= investmentDate && item.rateDate < currentDate;
    });
};

exports.Calculate = async(investmentDate, currentDate, cdbRate) => {
    let rates = await getRatesInterval(investmentDate, currentDate);
    let ratesInPeriod = [];
    let tdci_accumulated = 1;

    rates.forEach(element => {
        let cdi = element.rateValue;
        let tcdi = parseFloat((Math.pow(1 + (cdi / 100), rateBusinessPerYear) - 1).toFixed(8));

        tdci_accumulated += parseFloat((tcdi * cdbRate / 100).toFixed(16));
        ratesInPeriod.push({date: element.rateDate, tcdi, tdci_accumulated});
    });
    
    return ratesInPeriod;
};