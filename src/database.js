//Colocamos la cadena de conexion 

import mongoose from 'mongoose'

mongoose.connect("mongodb://127.0.0.1/comapanydb")
.then(db => console.log("DB is conected.."))
.catch(error => console.log(error))