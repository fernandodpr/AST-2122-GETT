const {Router} = require('express');
const router = Router();
const AuthManagerController =  require ('../controllers/AuthManager.controller.js');


//Todas estas rutas llevan delante /api

router.get('/status',AuthManagerController.status);
module.exports = router;