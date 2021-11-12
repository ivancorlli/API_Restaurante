require('dotenv').config()
const jwt = require('jsonwebtoken');
var SEED = 'pr0y3ct0'

function generateJWT (user) {
    //GENERAR TOKEN BASADO EN OBJETO USUARIO LOGUEADO
    return new Promise((resolve, reject)=>{
        jwt.sign(
            user.toJSON(),
            SEED, 
            {expiresIn: 900},
            (error, token) =>{
                if(error) {
                    reject(error);
                }
                resolve (token);
            }
            );
    })
    
}

async function createToken (payload){
    try{
        let token = await jwt.sign(payload,process.env.SECRET,{expiresIn:900})
        return token
    }catch(err){
        return err
    }
}


module.exports = {
    generateJWT,
    createToken
}