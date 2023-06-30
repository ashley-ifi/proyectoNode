
const {validationResult} = require('express-validator');
const UsersModel = require('../models/users');

const UsersController ={

    //Métodos Get

    get_users: function(req, res){

        UsersModel.find({}).then( (data) =>{
           return res.status(200).send({
            status: 200,
            message: "Usuarios encontrados",
            usuarios: data

           })
        }).catch((err) =>{
            return res.status(500).send({
                status: 500,
                message: "Error en la busqueda"
            });
        });
        
    },
    get_user: function(req, res){
        
        let params= req.params;
        UsersModel.find({email:params.email}).then( (data) =>{

           if(data.length ==0) return res.status(404).send({
            tatus: 404,
            message: "La búsqueda no genero respuesta"
           })
           return res.status(200).send({
            status: 200,
            message: "Usuario encontrado",
            usuarios: data

           })
        }).catch((err) =>{
            return res.status(500).send({
                status: 500,
                message: "Error en la busqueda"
            });
        });
        
        
    },

      //Método Post - create
    post_users: function(req, res){
       
        //Validación de datos que se envian en el endpoint
        const errors=  validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array() });
        }

        var body= req.body;
        
        UsersModel.find({email: body.email}).then( (data) =>{

            if(data.length >0) return res.status(400).send({
             status: 400,
             message: "El usuario ya se encuentra registrado"
            });

            var Users_Model = new UsersModel();

            Users_Model.nombre= body.nombre;
            Users_Model.edad= body.edad;
            Users_Model.email= body.email;
            Users_Model.password= body.password;

            Users_Model.save().then( (usersStored) =>{
  
                if(!usersStored) return send.status(404).send({mesagge: "No se pudo alamacenar el registro"});
              
                      return res.status(200).send({
                          status:200,
                          menssge: "Usuario almacenado."
                      });
                     }).catch((err) =>{
                        return res.status(500).send({
                        
                            message: err
                        });
                    });
                   
                }).catch((err) =>{
                    return res.status(500).send({
                        status: 500,
                        message: "Error en la búsqueda"
                    });
                });

            },


           // Método Delete
        delete_users: function(req, res){
               
            let params= req.params;
            UsersModel.findOneAndRemove({email: params.email}).then( (usersRemoved) =>{

                if(!usersRemoved) return res.status(404).send({
                 status: 404,
                 message: "Los datos ingresados son incorrectos"
                });


              return res.status(200).send({
                    status: 200,
                    message: "El usuario ha sido eliminado."
                   });
                 
                     
            }).catch((err) =>{
                return res.status(500).send({
                    status: 500,
                    message: "Error al eliminar."
                });
            });

            
        },

        //Método Udpdate
          
        update_users: function(req, res){

        const errors=  validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        let user_info= req.body;
        let email  = req.params.email;

         let user_info_update ={
            nombre: user_info.nombre,
            edad: user_info.edad,
            password: user_info.password

         };
        

         UsersModel.findOneAndUpdate({email: email}, user_info_update, {new:true}).then( (userUpdate, err ) =>{

            if(err) return res.status(500).json({ message: "Error al actualizar" });
            if(!userUpdate) return res.status(404).json({ message: "No existe el usuario."});


            return res.status(200).json({
                nombre: userUpdate.nombre,
                edad: userUpdate.edad,
                password: userUpdate.password
               });
          

        

        });

    }



};

module.exports= UsersController;