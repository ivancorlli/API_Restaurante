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


module.exports = {
    generateJWT
}