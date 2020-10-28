const repository = require('../repositories/cdi-repository');
const businessDayPerYar = 252;
const rateBusinessPerYear = 1 / businessDayPerYar;

getRatesInterval = async(investmentDate, currentDate) => {
    let rates = await repository.getAll();

    return rates
    .filter(function(item){
        return item.date >= investmentDate && item.date < currentDate;
    });
};

exports.Calculate = async(investmentDate, currentDate, cdbRate) => {
    let rates = await getRatesInterval(investmentDate, currentDate);
    let ratesInPeriod = [];
    let tdci_accumulated = 1;

    for (let index = rates.length-1; index >= 0; index--) {
        let cdi = rates[index].price;
        let tcdi = parseFloat((Math.pow(1 + (cdi / 100), rateBusinessPerYear) - 1).toFixed(8));

        tdci_accumulated += parseFloat((tcdi * cdbRate / 100).toFixed(16));
        ratesInPeriod.push({date: rates[index].date, tcdi, tdci_accumulated});
    }
    
    return ratesInPeriod;
};