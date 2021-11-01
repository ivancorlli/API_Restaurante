const express = require( 'express');


const app = express();



//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Rutas
app.get('/',(req,res)=>{
    return res.send('Server WORKS')
})

// app.use('/api',[

// ])

module.exports =  app
