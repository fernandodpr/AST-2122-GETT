const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/AuthManager',{
    useUnifiedTopology : true,
    useNewUrlParser: true
})
    .then((db) => console.log("Base de Datos Conectada"))
    .catch((error)=> console.error(error));