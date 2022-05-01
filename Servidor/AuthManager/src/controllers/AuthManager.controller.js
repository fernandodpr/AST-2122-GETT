const AuthManagerCtrl = {}

const User = require("../models/user.model.js")

AuthManagerCtrl.status = (req, res) => res.send('OK');

AuthManagerCtrl.getAll = async (req,res) => {
    try{
        const users = await User.find()
        res.json(users)
    }catch(error){
	res.status(500)
	res.send({message: 'Server Error'});
    }
}


AuthManagerCtrl.create = async (req,res) =>{
    //Crear nuevo cliente

    try{

        const newUser = new User(req.body)
        await newUser.save()
        res.send('Creado usuario con id ' + newUser._id);

    }catch (error){
	    res.status(500)
        res.send('No se ha podido crear el usuario');
    }
};
AuthManagerCtrl.deleteAll = async (req,res) =>{
    //Eliminar todos los clientes

    try{
        await User.deleteMany();
        res.send({message: '200 - OK'});

    }catch (error){
	res.status(500)
        res.send({message: 'Server Error'});
    }

}
AuthManagerCtrl.deleteID = async (req,res) =>{
    //Eliminar un usuario por ID

    try{
        var resultado = await User.findOneAndDelete({_id: req.params.id});
        if (!resultado){
            res.status(404);
            res.send("El usuario no existe en la Base de Datos");
            throw error;
        }
        res.send("El usuario se ha eliminado de la Base de Datos")
    }catch (error){
      if(error.name === 'CastError'){
        res.status(404);
        res.send("El usuario no existe en la Base de Datos");
      }else{
          res.status(500);
          res.send("Se ha prducido un error genérico");
      }
    }
};

AuthManagerCtrl.getUser = async (req,res) =>{
    //Get rol de usuario por ID

    try{
        const usuario = await User.findOne({_id: req.params.id});
        if(!usuario) throw error;
        res.send(usuario);
    }catch (error){
	res.status(500)
        res.send({message: 'Server Error'});
    }
};
module.exports = AuthManagerCtrl;
