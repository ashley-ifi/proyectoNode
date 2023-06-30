var mongoose = require('mongoose')
var Schema= mongoose.Schema;


var  UsesessionsSchema = Schema({
  
    id: {

        type: String,
        require: true,  
        unique:true
        
    },
      jwt: String
  
  });


  module.exports = mongoose.model('sessions', UsesessionsSchema);