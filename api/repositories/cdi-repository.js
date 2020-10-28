const csv = require('csvtojson');
const CDI = require('../models/cdi');

exports.getAll = async () => {
    let rates = [];
    await csv()
        .fromFile('./api/repositories/CDI.csv')
        .then((json)=>{
            let cdi;
            json.forEach((row)=>{
                cdi = new CDI(row['sSecurityName'], row['dtDate'].split('/').reverse().join('-'), parseFloat(row['dLastTradePrice']));
                rates.push(cdi);
            });
        })
    
    return rates;
};