const csv = require('csvtojson');
const cdiRepository = require('../repositories/cdi-repository');

getRates = async () => {
    let rates = [];
    await csv()
        .fromFile('./api/repositories/CDI.csv')
        .then((json)=>{
            rates = json;
        })
    
    return rates;
};

importData = async (data) => {
    // const cdi = data.filter(function (item) {
    //     return !Number.isNaN(item.dLastTradePrice) && item.dtDate != null
    // }).map(e => ({
    //     rateValue: parseFloat(e.dLastTradePrice),
    //     rateDate: e.dtDate.split('/').reverse().join('-')
    // }));

    const cdi = data.map(e => ({
        rateValue: parseFloat(e.dLastTradePrice),
        rateDate: e.dtDate.split('/').reverse().join('-')
    }));

    cdi.forEach(async (item) => {
        await cdiRepository.create(item);
    }, this);
};

clearDatabase = async () => {
    console.log(' -> cleaning database');
    await cdiRepository.clear();
}

exports.sync = async () => {

    console.log(' -> Data import process started');

    try {

        const data = await getRates();

        await clearDatabase();
        await importData(data);

        console.log(' -> Data import process successful');

    } catch (error) {
        return console.error(error);
    }
};