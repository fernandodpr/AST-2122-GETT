const ProductManagerCtrl = {}

const Product = require("../models/product.model.js")

ProductManagerCtrl.status = (req, res) => res.send('OK - Vamoh bien');

//Todo por ID
ProductManagerCtrl.getProduct = async (req, res) => {
    const producto = await Product.findOne({_id: req.params.id})
    res.send(producto);

}
ProductManagerCtrl.deleteProduct = async (req, res) => {
    await Product.findOneAndDelete({_id: req.params.id})
    res.send({message: '200 - OK'})
}
ProductManagerCtrl.editProduct = async (req, res) => {
    await Product.findOneAndUpdate({_id: req.params.id},req.body)
    res.send({message: '200 - OK'})

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

ProductManagerCtrl.getCategory = async (req,res) =>{
    const producto = await Product.find({categoria: req.params.name})
    res.send(producto);
}

ProductManagerCtrl.getId = async (req,res) =>{
    const producto = await Product.find({_id: req.params.id})
    res.send(producto);
}

module.exports = ProductManagerCtrl;
