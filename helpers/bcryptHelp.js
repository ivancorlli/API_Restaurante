const bcrypt = require('bcrypt');



async function encriptar (password){
    try{
        let hash = await bcrypt.hash(password,parseInt(process.env.BCRYPT))
        return hash
    }catch(err){
        return {ok:false,err}
    }
}


module.exports ={
    encriptar,
}