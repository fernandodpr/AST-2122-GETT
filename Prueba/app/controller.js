var Videojuego = require('./modelo/videojuego');

// Obtiene todos los objetos Videojuego de la base de datos
exports.getVideojuego = function(req, res){
  Videojuego.find(function(err, videojuego){
    if(err) res.send(err)
    res.json(videojuego);
  });

}

// Guarda un objeto Videojuego en base de datos
exports.setVideojuego = function(req, res){
  //Crea el objeto videojuego
  Videojuego.create({titulo: req.body.titulo, genero: req.body.genero, lanzamiento: req.body.lanzamiento, plataforma: req.body.plataforma, descripcion: req.body.descripcion},
                  function(err, persona){
                    if(err) res.send(err);
                    // Obtiene y devuelve todos los videojuegos tras crear uno de ellos
                    Videojuego.find(function(err, videojuego){
                            if(err) res.send(err)
                            res.json(videojuego);
                    });
                  });
}

//Modificamos un objeto Videojuego de la base de datos
exports.updateVideojuego = function(req, res){
  Videojuego.update({_id : req.params.videojuego_id},
                          {$set:{titulo: req.body.titulo, genero: req.body.genero, lanzamiento: req.body.lanzamiento, plataforma: req.body.plataforma, descripcion: req.body.descripcion}},
                          function(err, videojuego){
                            if(error)res.send(err);
                          //Obtiene y devuelve todas las personas tras crear una de ellas
                          Videojuego.find(function(err, videojuego){
                            if(err) res.send(err)
                            res.json(videojuego);
                          });
                      });
}

// Elimino un objeto Videojuego de la base de datos
exports.removePersona = function(req, res){
  Videojuego.remove({_id : req.params.videojuego_id}, function(err, videojuego){
              if(err) res.send(err);
              //Obtiene y devuelve todos los videojuegos tras borrar una de ellas
              Videojuego.find(function(err, videojuego){
                if(err) res.send(err)
                res.json(videojuego);
              });

  });

}
