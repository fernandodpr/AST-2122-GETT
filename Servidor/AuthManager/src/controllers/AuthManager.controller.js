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
        res.send({message: 'Todo bien'});
        
    }catch (error){
	    res.status(500)
        res.send({message: 'Server Error'});
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
        if ( ! await User.findOneAndDelete({_id: req.params.id})){
            throw error;
        }
       
        res.send("Makina bro")
    }catch (error){
	res.status(500)
        res.send({message: 'Server Error'});
    }
};

AuthManagerCtrl.getUser = async (req,res) =>{
    //Get rol de usuario por ID

    try{
        const usuario = await User.findOne({_id: req.params.id});
        res.send(usuario);
    }catch (error){
	res.status(500)
        res.send({message: 'Server Error'});
    }
};
module.exports = AuthManagerCtrl;
