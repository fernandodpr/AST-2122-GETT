const {Router} = require('express');
const router = Router();
const ProductManagerController =  require ('../controllers/ProductManager.controller.js');


//Todas estas rutas llevan delante /api

router.get('/status',ProductManagerController.status);

router.get('/product/',ProductManagerController.getProducts);
router.post('/product/',ProductManagerController.createProduct);
router.delete('/product/',ProductManagerController.deleteProducts);

router.get('/product/:id',ProductManagerController.getProduct);
router.delete('/product/:id',ProductManagerController.deleteProduct);
router.post('/product/:id',ProductManagerController.editProduct);

router.get('/category/:name',ProductManagerController.getCategory);


module.exports = router;
