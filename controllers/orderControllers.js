const Order = require('../schema/orderSchema')
const User = require('../schema/userSchema')
// const {addOrder} = require('../controllers/userControllers')

async function newOrder (req,res){
    const body = req.body;
    try{
        const user = await User.findById(body.user);

        const order = new Order(body);
        // const savedOrder = await order.save();
        return res.status(201).send({ok:true, msg:'Orden creada con exito', order})
    }catch(err){
        if(err.name === 'CastError') return res.status(400).send({ok:false, msg:'No se encunetra al usuario'});
        return res.status(500).send({ok:'false', msg:'Error interno', err})
    }
}


module.exports = {
    newOrder,
}