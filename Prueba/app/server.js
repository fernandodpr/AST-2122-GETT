//Inicializacion
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 7080;

//Configuracion
mongoose.connect('mongodb://localhost:3000/AST');

app.configure(function(){
  app.use(express.static(__dirname + '/angular'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

//Cargamos los endpoints
require('./app/routes.js')(app);

//Cogemos el puerto para escuchar
app.listen(port);
console.log("APP por el puerto "+ port);
