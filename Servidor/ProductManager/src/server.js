var port = 3001;


///////////////////////////////////////////////////////////
const express = require('express');
const morgan = require('morgan');





//////////////////////////////////////////////////////////////
console.log("Iniciando ejecuciion de ProductManager-Backend");

const app =express();

app.use(morgan('dev'));



app.listen(port);
console.log("Server on port:" , port);