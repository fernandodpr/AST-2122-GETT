/*
* Encargado de hacer las peticiones al API REST y actualizar
* los modelos de datos para que los muestre la web.
*/
angular.module('MainApp', [])

function mainController($scope, $http){
  $scope.newVideojuego = {};
  $scope.videojuegos = {};
  $scope.selected = false;

  //Obtenemos todos los datos de la base de datos
  $http.get('/api/videojuego').success(function(data){
    $scope.videojuegos = data;
  })
  .error(function(data)){
      console.log('Error: ' + data);
  });

  //Funcion para registrar un videojuego
  $scope.registrarVideojuego = function(){
    $http.post('api/videojuego', $scope.newVideojuego)
    .success(function(data){
        $scope.newVideojuego = {};  //Borramos los datos del formulario
        $scope.videojuegos = data;
    })
    .error(function(data){
      console.log('Error: ' + data);
    });
  };

  //Funcion para editar los datos de un videojuego
  $scope.modificarVideojuego = function(newVideojuego){
    $http.put('/api/videojuego' + $scope.newVideojuego._id, $scope.newVideojuego)
    .success(function(data){
      $scope.newVideojuego = {};  //Borramos los datos del formulario
      $scope.videojuegos = data;
      $scope.selected = false;
    })
    .error(function(data){
      console.log('Error: ' + data);
    });
  };

  // Funcion que borra un objeto videojuego conocido su id
  $scope.borrarVideojuego = function(newVideojuego){
    $http.delete('/api/videojuego' + $scope.newVideojuego._id)
    .success(function(data){
        $scope.newVideojuego = {};
        $scope.videojuegos = data;
        $scope.selected = false;
    })
    .error(function(data){
      console.log('Error: ' + data);
    });
    };

    // Funcion para coger el objeto seleccionado en la tabla
    $scope.selectVideojuego = function(videojuego) {
      $scope.newVideojuego = videojuego;
      $scope.selected = true;
      console.log($scope.newVideojuego, $scope.selected);
    };
}
