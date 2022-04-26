const {Schema, model} = require('mongoose');

const saleChema = new Schema({
    nombre: {type: String, required: true},
    stock: {type: Number, required: true},
    categoria: {type: String, required: true},
    precio: {type: Number, required: true},
    estudio: {type: String, required: true},
    lanzamiento: {type: Date, required: true},
    pegi: {type: Number, required: true},
    plataforma: {type: String, required: true},
    img: {type:String, required: true}
    
},{
    timestamps: true,
    versionKey: false,


});

module.exports = model("Sale",saleChema);