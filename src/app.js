import express from 'express'
import morgan from 'morgan'   
import pkg from '../package.json'
const bodyParser= require('body-parser');
const api_routes = require('./routes/api');
import authRoutes  from './routes/auth.routes'





const app = express();


app.set('pkg', pkg); 

app.use(morgan('dev'));
app.use(express.json()); 

//Middlewares
app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json({
   parameterLimit: 100000,
   limit: '50mb',
   extended:false
}));

app.use((err, req, res , next) =>{
   if(err instanceof SyntaxError && err.status=== 400 && 'body' in err) {    
       return res.status(400).send({ status:400,message: err.message})   
   }
});



app.use('/api', api_routes)
app.use('/api/auth', authRoutes)






module.exports= app;