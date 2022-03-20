const app = require('./app');
console.log("Iniciando ejecucion de ProductManager-Backend");


app.listen(app.get('port'));
console.log("Server on port:" , app.get('port'));