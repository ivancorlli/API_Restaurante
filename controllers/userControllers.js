const { encriptar } = require('../helpers/bcryptHelp');
const User = require('../models/userSchema')


async function crearUsuario (req,res){
    const body = req.body;

    if(!(body.email || body.password)) return res.status(400).send({ok:false, msg:'Ingrese los datos requeridos'});
    body.email = body.email.toLowerCase();

    try{
        const user = new User(body)
        let hash = await encriptar(user.password)
        if(hash.ok === false){
            return res.status(502).send({ok:false, msg:'Error al crear el usuario'})
        }
        user.password = hash;
        await user.save()
        return res.status(201).send({ok:true,msg:'Usuario creado correctamnte'})
    }catch(err){
        if(err.code = 'E11000'){
            return res.status(400).send({ok:false,msg:'El correo ingresado ya esta en uso'})
        }
        return res.status(500).send({ok:false,msg:'Error al intentar crear el usuario'})
    }


}


module.exports = {
    crearUsuario,
}