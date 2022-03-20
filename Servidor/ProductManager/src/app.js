///////////////////////////////////////////////////////////
const express = require('express');
const morgan = require('morgan');
const app =express();
//////////////////////////////////////////////////////////////
//Enviroment variables
app.set('port', process.env.PMBACKPORT || 4000);


app.use(morgan('dev'));


app.use("/api/product",require('./routes/ProductManager.routes.js'));

module.exports = app;