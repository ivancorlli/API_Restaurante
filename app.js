const express = require( 'express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();



//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:3000',
    credentials: true
}))

// Rutas
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
const menuRouter = require('./routes/menuRoutes')

app.get('/',(req,res)=>{
    return res.send('Server WORKS')
})

app.use('/api',[
    userRouter,
    orderRouter,
    menuRouter,
])

module.exports =  app
