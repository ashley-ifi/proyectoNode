

const mongoose= require('mongoose');
const Schema= mongoose.Schema;


const UsersSchema = Schema({
    nombre : String,
    edad: Number,
    email: {
      type: String,
      require: true, 
      index:true, 
      unique:true,
      sparse:true},
    
      password: { 
        type: String, require:true
       }
});







module.exports= mongoose.model('users',UsersSchema);
