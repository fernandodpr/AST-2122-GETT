var Videojuego = require('./modelo/videojuego');
var Controller = require('./controller');

module.exports = function(app) {
  //Devolver todos los videojuegos
  app.get('/api/videojuego', Controller.getVideojuego);
  // Crear un nuevo videojuego
  app.post('api/videojuego', Controller.setVideojuego);
  // Modificar los datos de un videojuego
  app.put('/api/videojuego/:videojuego_id', Controller.updateVideojuego);
  // Borrar un juego
  app.delete('/api/videojuego/videojuego_id', Controller.removeVideojuego);
  // application
  app.get('*', function(req, res){
    res.sendfile('./angular/index.httml');    //Carga unica de la vista
  });
};
