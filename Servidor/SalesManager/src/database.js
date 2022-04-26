const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/SalesManager',{
    useUnifiedTopology : true,
    useNewUrlParser: true
    
})
    .then((db) => console.log("Base de Datos Conectada"))
    .catch((error)=> console.error(error));