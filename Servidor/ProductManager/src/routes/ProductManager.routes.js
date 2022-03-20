const {Router} = require('express');
const router = Router();
const ProductManagerController =  require ('../controllers/ProductManager.controller.js');


router.get('/status',ProductManagerController.status);

router.get('/',ProductManagerController.getProducts);
router.post('/',ProductManagerController.createProduct);
router.delete('/',ProductManagerController.deleteProducts);

router.get('/:id',ProductManagerController.getProduct);
router.delete('/:id',ProductManagerController.deleteProduct);
router.post('/:id',ProductManagerController.editProduct);



module.exports = router;
