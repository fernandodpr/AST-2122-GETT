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
		res.send({ message: 'Server error' })
	}
}

SalesmanagerCtrl.getSales = async (req, res) => {
	try {
		const sales = await Sale.find()
		res.json(sales)
	} catch (error) {
		res.status(500)
		res.send({ message: 'Server error' })
	}
}

SalesmanagerCtrl.getSaleID = async (req, res) => {
	try {
		const venta = await Sale.findOne({ _id: req.params.id })
		res.send(venta)
	} catch (error) {
		res.status(500)
		res.send({ message: 'Server error' })
	}
}

SalesmanagerCtrl.getUser = async (req, res) => {
	try {
		const usuario = await User.findOne({ _id: req.params.id })
		res.send(usuario)
	} catch (error) {
		res.status(500)
		res.send({ message: 'Server error' })
	}
}

//Métodos POST
SalesmanagerCtrl.newSale = async (req, res) => {
	try {
		const sale = new Sale(req.body)
		const producto = await Product.findOne({ _id: sale.id_producto })
		let cant = sale.cantidad;
		let cantMax = producto.stock;
		if (cant <= cantMax) {
			producto.stock = producto.stock - cant;
			producto.save()
			console.log(producto.stock);
			await sale.save()
			res.send({ message: '200 - OK' })
		}
		else {
			res.status(500)
			res.send({ message: 'No hay suficientes productos en stock :(' })
		}
	} catch (error) {
		res.status(500)
		res.send({ message: 'Server error' })
	}
}

SalesmanagerCtrl.updateSale = async (req, res) => {
	try {
		await Sale.findOneAndUpdate({ _id: req.params.id }, req.body)
		res.send({ message: '200 - OK' })
	} catch (error) {
		res.status(500)
		res.send({ message: 'Server error' })
	}
}

//Métodos DELETE
SalesmanagerCtrl.deleteAllSales = async (req, res) => {
	try {
		await Sale.deleteMany();
		res.send({ message: '200 -OK' })
	} catch (error) {
		res.status(500)
		res.send({ message: 'Server error' })
	}
}

SalesmanagerCtrl.deleteSale = async (req, res) => {
	try {
		const auth = await getRol(req.get('Auth'));

		if (auth) var user = JSON.parse(auth);

		res.status(500);

		if (user.rol == 'Administrador') {
			res.status(401);
			throw Error;

		} else if (user.rol == "Cliente") {

			const compra = await Sale.findOneAndDelete({ _id: req.params.id })

			if (!compra) {
				res.status(404);
				throw Error;
			}
			const producto = await Product.findOne({ _id: compra.id_producto });
			producto.stock = producto.stock + compra.cantidad;
			producto.save()
			res.send({ message: 'El pedido ' + req.params.id + ' ha sido eliminado' });
		} else {
			res.status(500);
			throw Error;
		}
	} catch (error) {

		res.send({ message: 'Server error' })
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
