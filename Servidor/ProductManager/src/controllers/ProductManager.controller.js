const ProductManagerCtrl = {}

const Product = require("../models/product.model.js")

ProductManagerCtrl.status = (req, res) => res.send('OK');

//Todo por ID
ProductManagerCtrl.getProduct = async (req, res) => {
    try{
        const producto = await Product.findOne({_id: req.params.id})
        res.send(producto);
    }catch(error){
	res.status(500)
        res.send({message: 'Server error'})
    }

}
ProductManagerCtrl.deleteProduct = async (req, res) => {
    try{

        await Product.findOneAndDelete({_id: req.params.id});
        res.send({message: '200 - OK'})
    }catch(error){
	res.status(500)
        res.send({message: 'Server error'})
    }
}
ProductManagerCtrl.editProduct = async (req, res) => {
    try{
        await Product.findOneAndUpdate({_id: req.params.id},req.body)
        res.send({message: '200 - OK'})
    }catch(error){
	res.status(500)
        res.send({message: 'Server error'})
    }

}
//Genericos
ProductManagerCtrl.createProduct = async (req, res) => {
    try{
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.send({message: '200 - OK'})
    }catch(error){
	res.status(500)
        res.send({message: 'Server error'})
    }

}
ProductManagerCtrl.getProducts = async (req, res) => {
    try{
        const products = await Product.find()
        res.json(products)
    }catch(error){
	res.status(500)
        res.send({message: 'Server error'})
    }
}
ProductManagerCtrl.deleteProducts = async (req, res) => {
    try{
        await Product.deleteMany();
        res.send('OK');
    }catch(error){
	res.status(500)
        res.send({message: 'Server error'})
    }
}

ProductManagerCtrl.getCategory = async (req,res) =>{
    try{
        const producto = await Product.find({categoria: req.params.name})
        res.send(producto);
    }catch(error){
	res.status(500)
        res.send({message: 'Server error'})
    }
}



module.exports = ProductManagerCtrl;
