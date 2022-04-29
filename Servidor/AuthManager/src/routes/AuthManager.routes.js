const {Router} = require('express');
const router = Router();
const AuthManagerController =  require ('../controllers/AuthManager.controller.js');


//Todas estas rutas llevan delante /api

router.get('/status',AuthManagerController.status);

router.post('/user',AuthManagerController.create);

router.get('/user', AuthManagerController.getAll);

router.delete('/user', AuthManagerController.deleteAll);

router.get('/user/:id', AuthManagerController.getUser);

router.delete('/user/:id', AuthManagerController.deleteID);

module.exports = router;