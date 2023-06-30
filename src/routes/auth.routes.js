//Este archivo servira para autenticacion
import {Router} from 'express'
const router= Router()
const {body} = require('express-validator');
let userProtectUrl= require('../middlewares/authUser').userProtectUrl;


import * as authCtrl from '../controllers/authController'
 

router.post('/login',
    body('email').not().isEmpty(),
    body('password').not().isEmpty()
, authCtrl.login); 



router.post('/logout',userProtectUrl,authCtrl.logout)







module.exports = router;


//export default router;