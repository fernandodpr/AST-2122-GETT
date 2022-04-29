const {Schema, model} = require('mongoose');

const saleChema = new Schema({
    id_usuario: {type: String, required: true},
    id_producto: {type: String, required: true},
    cantidad: {type: Number, required: true},
    comprador: {type: String, required: true},
    direccion: {type: String, required: true}
},{
    timestamps: true,
    versionKey: false,


});

module.exports = model("Sale",saleChema);
