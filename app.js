const express = require('express');
const config = require('config');
const app = express();
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.urlencoded({
  extended: true
}));
 
const indexModel = require('./api/models/cdi');

mongoose.connect(config.connectionString);

app.use(express.json());

const calculatorRoute = require('./api/routes/calculator-route');
const importRoute = require('./api/routes/data-import-route');

app.use('/calculator', calculatorRoute);
app.use('/import', importRoute);

var options = {
  explorer: true
};
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.set('port', process.env.PORT || config.get('server.port'));
const port = app.get('port');

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
});