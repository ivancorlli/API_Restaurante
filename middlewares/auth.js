const jwt = require('jsonwebtoken')
const User = require('../schema/userSchema')

async function auth (req,res,next){
    const {token} = req.cookies;
    if(!token) return res.status(403).send({ok:'false' , msg:'No tiene permisos'})
    try{
        const verifyToken = await jwt.verify(token, process.env.SECRET);
        const user = await User.findById(verifyToken.id);
        if(!user.active) return res.status(401).send({ok:'false' , msg:'Usuario no verificado'})
        next()
    }catch(err){
        return res.status(403).send({ok:'false' , msg:'No tiene permisos'})
    }

}



module.exports = auth