const ProductManagerCtrl = {}

const Product = require("../models/product.model.js")

ProductManagerCtrl.status = (req, res) => res.send('OK - Vamoh bien');

//Todo por ID
ProductManagerCtrl.getProduct = (req, res) => {
    res.send('OK');
}
ProductManagerCtrl.deleteProduct = (req, res) => {
    res.send('OK');
}
ProductManagerCtrl.editProduct = (req, res) => {
    res.send('OK');
}
//Genericos
ProductManagerCtrl.createProduct = async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.send({message: '200 - OK'})

}
ProductManagerCtrl.getProducts = async (req, res) => {
   const products = await Product.find()
   res.json(products)
}
ProductManagerCtrl.deleteProducts = async (req, res) => {
    await Product.deleteMany();
    res.send('OK');
}





module.exports = ProductManagerCtrl;