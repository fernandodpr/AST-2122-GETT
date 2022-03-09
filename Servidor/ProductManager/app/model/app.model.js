var mongoose = require('mongoose');

module.exports = mongoose.model('Videojuego', {
  stock: Int,
  titulo: String,
  estudio: String,
  categoria: string[],
  pegi: INT,
  precio: Float,
  lanzamiento: String,
  plataforma: string[]

});

/*
Categoria es un conjunto.
    - Mundo abierto
    - Puzzle
    -
plataforma
    - Nintendo
    - PS5
    - XBOX
Lanzamiento
    - minimo: 1980
    - maximo: 2022
PEGI: 18, 16 -> no usar el +

*/
