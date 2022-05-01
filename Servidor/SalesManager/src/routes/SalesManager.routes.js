const {Router} = require('express');
const router = Router();
const SalesManagerController =  require ('../controllers/SalesManager.controller.js');


//Todas estas rutas llevan delante /api

router.get('/status', SalesManagerController.status);
router.get('/products', SalesManagerController.getProducts);
router.get('/order', SalesManagerController.getSales);
router.get('/order/:id', SalesManagerController.getSaleID);
router.get('/user/:id', SalesManagerController.getUser);

router.post('/order', SalesManagerController.newSale);
router.post('/order/:id', SalesManagerController.updateSale);

router.delete('/order', SalesManagerController.deleteAllSales);
router.delete('/order/:id', SalesManagerController.deleteSale);
module.exports = router;
