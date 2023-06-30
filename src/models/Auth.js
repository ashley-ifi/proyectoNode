import {  Schema, model} from "mongoose"
import bcrypt from 'bcryptjs' 

const authSchema = new Schema({
  
  email: String,
    password: String

});

// Metodo para encryptar la contraseña

authSchema.statics.encryptPassword = async (password)=> {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

// Metodo para comparar la contraseña 

authSchema.statics.comparePassword = async (password, receivedPassword)=> {
    return await bcrypt.compare(password, receivedPassword)
}

export default model('Auth', authSchema);

