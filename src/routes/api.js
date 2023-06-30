const express= require('express');
const {body} = require('express-validator');
const api = express.Router();
const UsersController= require('../controllers/userscontroller');

let userProtectUrl= require('../middlewares/authUser').userProtectUrl;



api.get('/users', UsersController.get_users); 
api.get('/users/:email', UsersController.get_user); 

//Validación para que todos los valores sean requeridos
api.post('/users',userProtectUrl,[
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('email').not().isEmpty(),
    body('password').not().isEmpty()
], UsersController.post_users); 


api.delete('/users/:email', UsersController.delete_users); 

api.put('/users/:email', [
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('password').not().isEmpty()
],UsersController.update_users); 





module.exports= api;