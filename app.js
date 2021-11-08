const express = require( 'express');


const app = express();



//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Rutas
const userRouter = require('./routes/userRoutes');

app.get('/',(req,res)=>{
    return res.send('Server WORKS')
})

app.use('/api',[
    userRouter,
])

module.exports =  app
