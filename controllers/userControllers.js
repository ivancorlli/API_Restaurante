
const { encriptar } = require("../helpers/bcryptHelp");
const User = require('../schema/userSchema')
const {sendMail} = require('../helpers/emailer')
const {verify,password} = require('../helpers/emailTemplates')
const jwt = require('jsonwebtoken')

var bcrypt = require('bcrypt');
var salt = 10;
var {createToken} =require('../helpers/token');



async function createUser(req, res) {
  const body = req.body;

  if (!(body.email || body.password))
    return res
      .status(400)
      .send({ ok: false, msg: "Ingrese los datos requeridos" });
  body.email = body.email.toLowerCase();

  try {
    const user = new User(body);
    // encriptar Contrasenia
    let hash = await encriptar(user.password);
    if (hash.ok === false)return res.status(502).send({ ok: false, msg: "Error al crear el usuario" });

    user.password = hash;
    // Guardar usuario en bd
    await user.save();
    let payload = {
      id:user.id
    }
    let idToken = await jwt.sign(payload, process.env.CONFIRM);
    // Contenido del mail
    let html = verify(`http://localhost:5000/api/confirm?value=${idToken}`);
    let emailContent = {
      from: 'foo@mail.com',
      to: user.email,
      subject: 'Verificacion de cuenta',
      html:html,
    }
    // Enviar mail de confirmacion
    await sendMail(emailContent);
    // Respusta exitosa
    return res.status(201).send({ ok: true, msg: "Usuario creado correctamente, revise su correo" });
  } catch (err) {
    console.log(err)
    if (err.code = 11000)return res.status(400).send({ ok: false, msg: "El correo ingresado ya esta en uso" });
    return res.status(500).send({ ok: false, msg: "Error al intentar crear el usuario",err});
  }
}

async function getUsers(req, res) {

  const id = req.params.id;

  try {
  if(id){
    let {status,user,err} = await getUser(id);
    if(!user) return res.status(400).send({ok:false, msg:'No existe un usario con este id'});
    if(status === 400) return res.status(400).send({ok:false, msg:'No existe un usario con este id'});
    if(status === 500) return res.status(500).send({ok:false, msg:'Error al obtener usuario',err})
    return res.status(200).send({ok:true, msg:'Usuario obtenido con exito',user});
  }
    const count = await User.countDocuments();
    let usersDb = await User
      .find({})

    const users = usersDb.map(user =>{
        user.password = undefined;
        return user
    });

    return res
      .status(200)
      .send({ ok: true, msg: "Usuarios obtenidos con exito",users });
  } catch (err) {
    return res
      .status(500)
      .send({
        ok: false,
        msg: "Se produjo un error al obtener los usuarios",
        err,
      });
  }
}

async function getUser(id) {

  try{
    let user = await User.findById(id);
    user.password = undefined;
    return {user};
  }catch(err){
    if(err.name === 'CastError') return {status:400};
    return {status:500,err};
  }
}

async function confirmUser (req,res){
  const token =req.query.value;
  if(!token) return res.status(403).send({ok:false, msg:'No tiene autorizacion'})
  try{
    const {id} = await jwt.verify(token, process.env.CONFIRM);
    const user = await User.findById(id);
    if(user.active === true)return res.status(400).send({ok:false, msg:'Usuario ya confirmado'});
      user.active = true;
    await user.save();
    return res.status(200).send({ok:true,msg:'Verficacion de usuario exitosa'})
  }catch(err){
    if(err.name === 'CastError') return res.status(400).send({ok:false, msg:'No existe el usuario'});
    return res.status(500).send({ok:false, msg:'Error al confirmar usuario',err})
  }
}

async function resetPassword (req,res){
  const {email} = req.body;
  try{
    // Buscar usuario
    const user = await User.findOne({email:email});
    if(!user) return res.status(400).send({ok:false, msg:'Error al encontrar usuario'})

    // Crear mail de recuperacion
    let html = password(`http://localhost:5000/api/reset/${user.id}`)
    let emailContent = {
      from: 'foo@mail.com',
      to: user.email,
      subject: 'Recuperar cuenta',
      html:html,
    }
    // Enviar mail de confirmacion
    await sendMail(emailContent);

    return res.status(200).send({ok:true, msg:'Solicitud de recuperacion exitosa'})
  }catch(err){
    return res.status(500).send({ok:false, msg:'Error al crear la solicitud',err})
  }
}

async function newPassword(req,res){
  const id = req.params.id;
  const {password} = req.body;
  if(!password) return res.status(400).send({ok:false, msg:'Cargue datos validos'});

  try{
    const hash = await encriptar(password);
    const user = await User.findByIdAndUpdate(id,{password:hash})
    return res.status(200).send({ok:true, msg:'Datos guardados exitosamente'})
  }catch(err){
    if(err.name === 'CastError') return res.status(400).send({ok:false, msg:'No existe el usuario'});
    return res.status(500).send({ok:false, msg:"Error al guardar los datos",err})
  }
}

const loginUsuario = async (req, res) => {

    const passwordText = req.body.password;
    const emailToFind = req.body.email;

    try {
        const user = await User.findOne({
            email: emailToFind
        }).exec();
        if (!user) return res.status(404).send({
            ok: false,
            msg: 'El usuario no fue encontrado',
        });

        const passwordDBHashed = user.password;
        const result = await bcrypt.compare(passwordText, passwordDBHashed);

        let payload = {
          id:user.id,
          role: user.role,
          active: user.active,
        }

        if (result) {
            const token = await createToken(payload)
            res.cookie('token',token,{
              maxAge: 25 * 60 * 1000 ,
              httpOnly:true,
              sameSite:false,
              // secure:true,
            });
            payload.id = undefined;
            return res.status(200).send({
                ok: true,
                msg: 'Login correcto',
                payload
            })
        } else {
            return res.status(401).send({
                ok: false,
                msg: 'Datos ingresados no son correcto.'
            })
        }

        } catch (error) {
            return res.status(500).send({
                ok: false,
                msg: 'No se pudo realizar el login',
                error
            })
        }
}

async function deleteUser(req,res){
  const id = req.params.id;
  if(!id) return res.status(400).send({ok:false, msg:'Uusario Invalido'})

  try{
    
    await User.findByIdAndDelete(id);
    return res.status(200).send({ok:true, msg:'Exito al borrar usuario'})
  }catch(err){
    return res.status(500).send({ok:false, msg:'Error interno'})
  }
}


async function addOrders (userId, order){
  try{
    const user = await User.findById(userId).exec();
    user.orders.push(order)
    await User.save()
  }catch(err){

  }
}

module.exports = {
  createUser,
  getUsers,
  confirmUser,
  resetPassword,
  newPassword,
  loginUsuario,
  addOrders,
  deleteUser,
};

