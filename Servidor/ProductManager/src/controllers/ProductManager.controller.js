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
ProductManagerCtrl.createProduct = (req, res) => {
    res.send('OK');
}
ProductManagerCtrl.getProducts = async (req, res) => {
   const products = await Product.find()
   res.json(products)
}
ProductManagerCtrl.deleteProducts = (req, res) => {
    res.send('OK');
}





module.exports = ProductManagerCtrl;