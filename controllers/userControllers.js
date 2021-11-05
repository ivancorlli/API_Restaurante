const { encriptar } = require("../helpers/bcryptHelp");
const User = require('../schema/user')

async function createUser(req, res) {
  const body = req.body;

  if (!(body.email || body.password))
    return res
      .status(400)
      .send({ ok: false, msg: "Ingrese los datos requeridos" });
  body.email = body.email.toLowerCase();

  try {
    const user = new User(body);
    let hash = await encriptar(user.password);
    if (hash.ok === false) {
      return res
        .status(502)
        .send({ ok: false, msg: "Error al crear el usuario" });
    }
    user.password = hash;
    await user.save();
    return res
      .status(201)
      .send({ ok: true, msg: "Usuario creado correctamnte" });
  } catch (err) {
    if ((err.code = "E11000")) {
      return res
        .status(400)
        .send({ ok: false, msg: "El correo ingresado ya esta en uso" });
    }
    return res
      .status(500)
      .send({ ok: false, msg: "Error al intentar crear el usuario",err});
  }
}

async function getUsers(req, res) {
  const id = req.params.id;
  let page = parseInt(req.query.page);
  let limit = parseInt(req.query.limit);
  if (!page) page = 1;
  if (!limit) limit = 10;

  try {
  if(id){
    let {status,user,err} = await getUser(id);
  if(status === 200) return res.status(200).send({ok:true, msg:'Usuario obtenido con exito',user});
  if(status === 400) return res.status(400).send({ok:false, msg:'No existe un usario con este id'});
  if(status === 500) return res.status(500).send({ok:false, msg:'Error al obtener usuario',err})
  }

    const count = await User.countDocuments();
    const users = await User
      .find({})
      .skip((page - 1) * 10)
      .limit(limit);
    let result = {
      totalPages: Math.ceil(count / limit),
      page: page,
      size: limit,
    };
    if (page > 1) {
      result.previous = page - 1;
    }
    if (limit < count) {
      result.next = page + 1;
    }
    return res
      .status(200)
      .send({ ok: true, msg: "Usuarios obtenidos con exito",result,users });
  } catch (err) {
    console.log(err)
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
    return {status:200,user};
  }catch(err){
    if(err.name === 'CastError') return {status:400};
    return {status:500,err};
  }
}
module.exports = {
  createUser,
  getUsers,
};
