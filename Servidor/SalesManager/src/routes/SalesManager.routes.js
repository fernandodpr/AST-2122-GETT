const {Router} = require('express');
const router = Router();
const SalesManagerController =  require ('../controllers/SalesManager.controller.js');


//Todas estas rutas llevan delante /api

router.get('/status',SalesManagerController.status);
module.exports = router;