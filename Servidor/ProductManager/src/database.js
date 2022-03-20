const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ProductManager',{
    useUnifiedTopology : true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then((db) => console.log("Base de Datos Conectada"))
    .catch((error)=> console.error(error));