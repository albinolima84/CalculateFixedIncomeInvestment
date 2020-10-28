const express = require('express');
const config = require('config');
const app = express();

app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());

const calculatorRoute = require('./api/routes/calculator-route');

app.use('/calculator', calculatorRoute);

app.set('port', process.env.PORT || config.get('server.port'));
const port = app.get('port');

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
});