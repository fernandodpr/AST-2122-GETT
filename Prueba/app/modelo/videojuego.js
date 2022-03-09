var mongoose = require('mongoose');

module.exports = mongoose.model('Videojuego', {
  titulo: String,
  genero: String,
  lanzamiento: String,
  plataforma: String,
  descripcion: String

});
