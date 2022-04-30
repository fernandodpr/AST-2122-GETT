const ProductManagerCtrl = {}
const http = require('http');
const Product = require("../models/product.model.js")

ProductManagerCtrl.status = (req, res) => res.send('OK');

//Todo por ID
ProductManagerCtrl.getProduct = async (req, res) => {
    try {
        const producto = await Product.findOne({ _id: req.params.id })
        res.send(producto);
    } catch (error) {
        res.status(500)
        res.send({ message: 'Server error' })
    }

}
ProductManagerCtrl.deleteProduct = async (req, res) => {

        res.status(500);
        try {
            const auth = await getRol(req.get('Auth'));
        
            if (auth) var user = JSON.parse(auth);
    
            res.status(500);
            var id = req.params.id;
            if (user.rol == 'Administrador') {
                if (!await Product.findOneAndDelete({ _id: req.params.id })){
                    res.status(404);
                    res.send("No ha sido posible localizar el producto");
                    throw Error;
                }
                res.status(200);
                res.send("El producto " + id+ ' ha sido eliminado.')
            }else if (user.rol== 'Cliente'){
                res.status(401);
			    res.send('El ususario no tiene los permisos necesarios.');
            }else{
                res.status(500);
                res.send('Ha fallado la identificación de usuario.');
                throw Error;
            }
    } catch (error) {
        
    }
}
ProductManagerCtrl.editProduct = async (req, res) => {
    res.status(500);
    try {
        const auth = await getRol(req.get('Auth'));
	
		if (auth) var user = JSON.parse(auth);

		res.status(500);

		if (user.rol == 'Administrador') {
            
            if (!await Product.findOneAndUpdate({ _id: req.params.id }, req.body)){
                res.status(404);
                res.send('No ha sido posible encontrar el producto');
                throw Error;
            }
            res.status(200);
            res.send({ message: 'Producto editado con éxito' })
        }else if(user.rol == "Cliente"){
			res.status(401);
			res.send('El ususario no tiene los permisos necesarios.');
            throw Error;
        }else{
            res.status(500);
            res.send('Ha fallado la identificación de usuario.');
			throw Error;
        }
    } catch (error) {
        
    }

}
//Genericos
ProductManagerCtrl.createProduct = async (req, res) => {
    try {
        const auth = await getRol(req.get('Auth'));

        if (auth) var user = JSON.parse(auth);

        res.status(500);

        if (user.rol == 'Administrador') {
            const newProduct = new Product(req.body)
            await newProduct.save()
            res.status(200);
            res.send({ message: 'Creado producto con id ' + newProduct._id });
        } else if (user.rol == "Cliente") {
            res.status(401);
            throw Error;
        } else {
            res.status(500);
            throw Error;
        }
    } catch (error) {
    
        res.send({ message: 'Server error' })
    }

}
ProductManagerCtrl.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.status(500)
        res.send({ message: 'Server error' })
    }
}
ProductManagerCtrl.deleteProducts = async (req, res) => {
    try {
        await Product.deleteMany();
        res.send('OK');
    } catch (error) {
        res.status(500)
        res.send({ message: 'Server error' })
    }
}

ProductManagerCtrl.getCategory = async (req, res) => {
    try {
        const producto = await Product.find({ categoria: req.params.name })
        res.send(producto);
    } catch (error) {
        res.status(500)
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


module.exports = ProductManagerCtrl;
