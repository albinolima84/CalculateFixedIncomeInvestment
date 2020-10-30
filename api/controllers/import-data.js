const importService = require('../services/import-cdi');
const repository = require('../repositories/cdi-repository');

exports.post = async (request, response) => {
    try{
        await importService.sync();
        response.status(200).json({code: 0, message: 'Data imported successfully'});
    }
    catch(error){
        console.log(error);
        response.status(500).json({code: 500, message: 'unexpected error'});
    }
};

exports.get = async (req, res, next) => {
    try{
        var rates = await repository.getAll();
        if (rates.length > 0) {
            res.status(200).send(rates);
        }
        else {
            res.status(204).send();
        }
        
    }
    catch(error){
        console.log(error);
        response.status(500).json({code: 500, message: 'unexpected error'});
    }
};
