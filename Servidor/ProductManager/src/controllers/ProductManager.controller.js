const ProductManagerCtrl = {}


ProductManagerCtrl.status = (req, res) => res.send('OK - Vamoh bien');

ProductManagerCtrl.getProduct = (req, res) => res.send('OK');
ProductManagerCtrl.deleteProduct = (req, res) => res.send('OK');
ProductManagerCtrl.editProduct = (req, res) => res.send('OK');

ProductManagerCtrl.createProduct = (req, res) => res.send('OK');
ProductManagerCtrl.getProducts = (req, res) => res.send('OK');
ProductManagerCtrl.deleteProducts = (req, res) => res.send('OK');





module.exports = ProductManagerCtrl;