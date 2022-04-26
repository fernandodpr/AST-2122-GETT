const {Router} = require('express');
const router = Router();
const ProductManagerController =  require ('../controllers/AuthManager.controller.js');


//Todas estas rutas llevan delante /api

router.get('/status',ProductManagerController.status);
module.exports = router;