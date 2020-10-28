const cdirates = require('../repositories/cdi-repository');
const rateService = require('../services/investment-calculator');

exports.get = async(req, res, next) => {
    var rates = await cdirates.getAll();
    res.status(200).send(rates);
};

exports.post = async (request, response) => {
    let rates = await rateService.Calculate(request.body.investmentDate, request.body.currentDate, request.body.cdbRate);
    response.status(200).json(rates);
};