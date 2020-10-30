const express = require('express');
const config = require('config');
const app = express();
const mongoose = require('mongoose');

app.use(express.urlencoded({
  extended: true
}));

const indexModel = require('./api/models/cdi');
const importData = require('./api/services/import-cdi');

mongoose.connect(config.connectionString, function(err, res){
  if (err) {
    console.log ('ERROR connecting to: ' + config.connectionString + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + config.connectionString);
    //importData.sync();
  }
});

app.use(express.json());

const calculatorRoute = require('./api/routes/calculator-route');

app.use('/calculator', calculatorRoute);

app.set('port', process.env.PORT || config.get('server.port'));
const port = app.get('port');

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
});