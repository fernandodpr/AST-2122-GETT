const SalesmanagerCtrl = {}
const http = require('http');
const Product = require("../models/product.model.js")
const Sale = require("../models/sale.model.js")

SalesmanagerCtrl.status = (req, res) => res.send('OK');

//Métodos GET
SalesmanagerCtrl.getProducts = async (req, res) => {
	try {
		const products = await Product.find()
		res.json(products)
	} catch (error) {
		res.status(500)
		res.send('Server error')
	}
}

SalesmanagerCtrl.getSales = async (req, res) => {
	try {
		const sales = await Sale.find()
		res.json(sales)
	} catch (error) {
		res.status(500)
		res.send('Server error')
	}
}

SalesmanagerCtrl.getSaleID = async (req, res) => {
	try {
		const venta = await Sale.findOne({ _id: req.params.id })
		res.send(venta)
	} catch (error) {
		res.status(500)
		res.send('Server error')
	}
}

SalesmanagerCtrl.getUser = async (req, res) => {

	try {
		const pedidos = await Sale.find({id_usuario:req.params.id});
		console.log(pedidos);
		if(pedidos.length>0) {res.send(pedidos);}
		else{
			res.status(404);
			res.send("No se ha encontrado ningun pedido para ese cliente")
		}
	} catch (error) {
		res.status(500)
		res.send('Server error' )
	}
}

//Métodos POST
SalesmanagerCtrl.newSale = async (req, res) => {
	res.status(500)
	try {
		const auth = await getRol(req.get('Auth'));
	
		if (auth) var user = JSON.parse(auth);

		res.status(500);

		if (user.rol == 'Administrador') {
			res.status(401);
			throw Error;

		} else if (user.rol == "Cliente") {

			const sale = new Sale(req.body);
		
			var producto = await Product.findOne({ _id: sale.id_producto });
			
			if (!producto){		//no se llega a ejecutar
				res.status(404);	//salta directamente al catch
				throw Error;
			}
			let cant = sale.cantidad;
			let stock = producto.stock;

			if ((cant <= stock) && (cant>0)) {
				producto.stock = producto.stock - cant;
				producto.save()
				
				await sale.save();
				res.status(200)
				res.send('Se ha realizado la compra: '+ sale._id )
			}
			else {
				
				res.send('No hay suficientes productos en stock :(')
			}
		}else {
			res.status(500);
			throw Error;
		}
	} catch (error) {
		res.send({ message: 'Server error' })
	}
}

SalesmanagerCtrl.updateSale = async (req, res) => {
	res.status(500)
	try {
		const auth = await getRol(req.get('Auth'));
		
		if(auth) var user = JSON.parse(auth);
		console.log(user.rol);
		if(user.rol == 'Administrador'){
			res.status(401)
			throw Error;
		}
		else if(user.rol == 'Cliente'){
			const compra = await Sale.findOne({ _id: req.params.id })
			compra.comprador = req.body.comprador;
			compra.direccion = req.body.direccion;
			await Sale.findOneAndUpdate({_id: req.params.id}, compra);
			res.status(200)	
			res.send('200 - OK' )
		}
		else{
			throw Error;
		}
	} catch (error) {
		res.send('Server error')
	}
}

//Métodos DELETE
SalesmanagerCtrl.deleteAllSales = async (req, res) => {
	try {
		await Sale.deleteMany();
		res.send('200 -OK' )
	} catch (error) {
		res.status(500)
		res.send('Server error' )
	}
}

SalesmanagerCtrl.deleteSale = async (req, res) => {
	try {
		const auth = await getRol(req.get('Auth'));

		if (auth) var user = JSON.parse(auth);

		res.status(500);

		if (user.rol == 'Administrador') {
			res.status(401);
			res.send("El usuario no tiene permisos");
			throw Error;

		} else if (user.rol == "Cliente") {
			
			const compra = await Sale.findOneAndDelete({ _id: req.params.id })

			if (!compra) {
				res.status(404);
				res.send("El pedido no existe");
				throw Error;
			}
			const producto = await Product.findOne({ _id: compra.id_producto });
			producto.stock = producto.stock + compra.cantidad;
			producto.save()
			res.status(200)
			res.send('El pedido ' + req.params.id + ' ha sido eliminado');
		} else {
			res.status(500);
			res.send("Error generico");
			throw Error;
		}
	} catch (error) {

		
	}



}

function getRol(id) {
	return new Promise((res, rej) => {
		http.get('http://localhost:3003/api/user/' + id, (resp) => {

			let data = '';
			// A chunk of data has been received.
			resp.on('data', (chunk) => {
				data += chunk;
			});

			// The whole response has been received. Print out the result.
			resp.on('end', () => {
				res(data);
			});

		}).on("error", (err) => {
			console.log("Error en la petición de rol");
			rej(0);
		});
	}

	);
}

module.exports = SalesmanagerCtrl;
