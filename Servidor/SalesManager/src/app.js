///////////////////////////////////////////////////////////
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app =express();
//////////////////////////////////////////////////////////////
//Enviroment variables
app.set('port', process.env.PMBACKPORT || 3002);

app.use(cors());
app.use(morgan('dev'));

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use("/api",require('./routes/SalesManager.routes.js'));

module.exports = app;