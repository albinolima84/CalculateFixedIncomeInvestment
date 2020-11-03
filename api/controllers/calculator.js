const rateService = require('../services/investment-calculator');

exports.post = async (request, response) => {
    try{
        if(requestIsValid(request.body)) {
            let rates = await rateService.Calculate(request.body.investmentDate, request.body.currentDate, parseFloat(request.body.cdbRate), parseFloat(request.body.investmentValue));
            response.status(200).send(rates);
        }
        else {
            response.status(400).json({code: 400, message: 'Invalid parameters'});
        }
    }
    catch(error){
        console.log(error);
        response.status(500).json({code: 500, message: 'unexpected error'});
    }
};

requestIsValid = (parameters) => {
    if(parameters == null) return false;

    if(parameters.investmentDate == null || parameters.currentDate == null || parameters.cdbRate == null || parameters.investmentValue == null) return false;

    return true;
};