const importService = require('../services/import-cdi');

exports.post = async (request, response) => {
    await importService.sync();
    response.status(200).json('Dados importados com sucesso');
};