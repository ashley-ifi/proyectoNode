import Auth from '../models/Auth'
import jwt from 'jsonwebtoken'
import config from '../config'
var Sessions = require('../models/sessions')


export const login = async (req, res)=>{
  
       const {email, password} =req.body;

       const newAuth = new Auth({
       
        email,
        password: await Auth.encryptPassword(password)
       })


          const savedAuth = await newAuth.save();

          // creamos el token
         
          const access_token = jwt.sign({id: savedAuth._id}, config.SECRET, {
            expiresIn: 86400 
          });


          let update ={
                 id: savedAuth._id,
                 jwt : access_token
          };

          //
        Sessions.findOneAndUpdate({id: savedAuth._id}, update, {upsert:true, new: true}).then ((err, sessionsUpdate ) =>{

                if(err) return res.status(500).send({message: err});

                if(!sessionsUpdate)return res.status(404).send({message: "Datos erroneos"});
              
           
                return res.status(200).json({
                     status: 200,
                     message: "Autenticación correcta",
                     token :  access_token
                    });
          

        

                  });
          
              }

         
     

export const logout = async (req, res)=>{

      Sessions.findOneAndRemove({id: req.decoded.id}).then ((err, sessionDeleted) =>{
        if(err) return res.status(500).send({message: err});
        if(sessionDeleted) return res.status(404).send({message: "Datos erroneos"});

          return res.status(200).send({
            menssage: "Usuario salió correctamente."
          })
     
          });

}