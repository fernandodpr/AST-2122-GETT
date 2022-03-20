const {Router} = require('express');
const router = Router();
const ProductManagerController =  require ('../controllers/ProductManager.controller.js');


router.get('/status',ProductManagerController.status);

router.get('/',ProductManagerController.getProducts);
router.post('/',ProductManagerController.createProduct);
router.delete('/',ProductManagerController.deleteProducts);

router.get('/:productID"',ProductManagerController.getProduct);
router.delete('/:productID"',ProductManagerController.deleteProduct);
router.post('/:productID"',ProductManagerController.editProduct);



module.exports = router;
