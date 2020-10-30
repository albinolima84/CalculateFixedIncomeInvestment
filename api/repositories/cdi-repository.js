const mongoose = require('mongoose');
const cdi = require('../models/cdi');
//const indexSchema = require('../models/cdi');
const cdiIndex = mongoose.model('CDI');

exports.getRates = async (investmentDate, currentDate) => {
    let cdiResult = [];
    var query = {
            rateDate: {
                        $gte: investmentDate,
                        $lt: currentDate
            }
    };

    cdiResult = await cdiIndex.find({}).sort({ 'rateDate': 1 });

    return cdiResult;
};

exports.getAll = async () => {
    return await cdiIndex.find({}).sort({ 'rateDate': 1 });
};

exports.clear = async() => {
    await cdiIndex.remove({});
};

exports.create = async (data) => {
    try {
        var newCDI = new cdiIndex(data);

        await newCDI.save();

    } catch (error) {
        console.error(error);        
    }
};