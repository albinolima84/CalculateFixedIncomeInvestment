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
    const cdi = data.map(e => ({
        rateValue: parseFloat(e.dLastTradePrice),
        rateDate: e.dtDate.split('/').reverse().join('-')
    }));

    await cdiRepository.import(cdi);
};

clearDatabase = async () => {
    console.log(' -> cleaning database');
    await cdiRepository.clear();
}

exports.sync = async () => {

    console.log(' -> Data import process started');

    const data = await getRates();

    await clearDatabase();
    await importData(data);

    console.log(' -> Data import process successful');
};