const express = require('express');
const config = require('config');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
var cors = require('cors');

app.use(express.urlencoded({
  extended: true
}));
 
const indexModel = require('./api/models/cdi');

app.use(express.json());

//enables cors
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

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