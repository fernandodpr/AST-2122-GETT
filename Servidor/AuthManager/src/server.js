const db = require('./database.js');
const app = require('./app');

console.log("Iniciando ejecucion de AuthManager");


app.listen(app.get('port'));
console.log("Server on port:" , app.get('port'));