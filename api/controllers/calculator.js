const rateService = require('../services/investment-calculator');
const repository = require('../repositories/cdi-repository');

exports.get = async (req, res, next) => {
    var rates = await repository.getAll();
    res.status(200).send(rates);
};

exports.post = async (request, response) => {
    let rates = await rateService.Calculate(formatDate(request.body.investmentDate), formatDate(request.body.currentDate), request.body.cdbRate);
    response.status(200).json(rates);
};

formatDate = (date) => {
    return new Date(date);    
};