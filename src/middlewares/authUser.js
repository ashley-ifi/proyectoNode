 const jwt = require('jsonwebtoken')
 import config from '../config'

 let Sessions= require('../models/sessions.js')


 const middlewares ={

      userProtectUrl: function (req, res , next){

        const token = req.headers['access-token'];

        if(token){

            jwt.verify(token, config.SECRET, (err, decoded) =>{
                if(err){
                    return res.status(403).json({
                        message: "Token invalido"
                    });
                }else {
                      req.decoded = decoded;
                

     Sessions.findOne({id: req.decoded.id, jwt: token}).then((err, session ) =>{
        if(err) return res.status(500).send({message: "Error al devolver datos."});
        if(!session) return res.status(404).send({message: "Los datos de autenticación no son válidos."});
       
           next();

     });

                     
                }
            });

        }else{
            res.status(403).send({
                message: "Token no válido"
            });
        }



       }

};

module.exports = middlewares;