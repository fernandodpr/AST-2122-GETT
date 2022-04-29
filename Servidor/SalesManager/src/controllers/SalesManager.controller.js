const SalesmanagerCtrl = {}
const http = require('http');
const Product = require("../models/product.model.js")
const Sale = require("../models/sale.model.js")

SalesmanagerCtrl.status = (req, res) => res.send('OK');

//Métodos GET
SalesmanagerCtrl.getProducts = async (req, res) => {
	try{
		const products = await Product.find()
		res.json(products)
	}catch(error){
		res.status(500)
		res.send({message: 'Server error'})
	}
}

SalesmanagerCtrl.getSales = async (req, res) => {
	try{
		const sales = await Sale.find()
		res.json(sales)
	}catch(error){
		res.status(500)
		res.send({message: 'Server error'})
	}
}

SalesmanagerCtrl.getSaleID = async (req, res) => {
	try{
		const venta = await Sale.findOne({_id: req.params.id})
		res.send(venta)
	}catch(error){
		res.status(500)
		res.send({message: 'Server error'})
	}
}

SalesmanagerCtrl.getUser = async (req, res) => {
	try{
		const usuario = await User.findOne({_id: req.params.id})
		res.send(usuario)
	}catch(error){
		res.status(500)
		res.send({message: 'Server error'})
	}
}

//Métodos POST
SalesmanagerCtrl.newSale = async (req, res) => {
	try{
		const sale = new Sale(req.body)
		await sale.save()
		res.send({message: '200 - OK'})
	}catch(error){
		res.status(500)
		res.send({message: 'Server error'})
	}
}

SalesmanagerCtrl.updateSale = async (req, res) => {
	try{
		await Sale.findOneAndUpdate({_id: req.params.id}, req.body)
		res.send({message: '200 - OK'})
	}catch(error){
		res.status(500)
		res.send({message: 'Server error'})
	}
}

//Métodos DELETE
SalesmanagerCtrl.deleteAllSales = async (req, res) => {
	try{
		await Sale.deleteMany();
		res.send({message: '200 -OK'})
	}catch(error){
		res.status(500)
		res.send({message: 'Server error'})
	}
}

SalesmanagerCtrl.deleteSale = async (req, res) => {
	const auth = await getRol(req.body.auth);

	console.log(auth);


	if(auth=='Administrador'){
		console.warn("Estoy en el IF");
		try{
			//await Sale.findOneAndDelete({_id: req.params.id});
			res.send({message: '200 - OK'})
		}catch(error){
			res.send({message: 'Server error'})
		}
	}

}

async function getRol(id) {
	http.get('http://localhost:3003/api/user/'+id, (resp) => {

	let data = '';
	// A chunk of data has been received.
	resp.on('data', (chunk) => {
		data += chunk;
	});

 	// The whole response has been received. Print out the result.
  	resp.on('end', () => {
		data=JSON.parse(data);
		console.log("Tenemos la respuesta");
		console.warn(data.rol);
		return data.rol;
	});

	}).on("error", (err) => {
		console.log("Error en la petición de rol");
  		return null;
	});
}


module.exports = SalesmanagerCtrl;
