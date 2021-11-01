require('dotenv').config()
const  mongoose  = require( "mongoose");
const app = require( './app');



(async function connect(){
    try{
        await mongoose.connect(process.env.DB_URI,{});
        console.log('\x1b[36m La conexión a la base de Datos se realizo correctamente \x1b[37m');
        app.listen(process.env.PORT, () => {
            console.log('\x1b[35m Server started on port ' + process.env.PORT + '\x1b[37m');
        });
    }catch (err) {
        console.log('\x1b[31m Error al conectar a la base de datos \x1b[37m', err);
    }
})();