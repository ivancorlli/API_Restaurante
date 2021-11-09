<<<<<<< HEAD
const { encriptar } = require("../helpers/bcryptHelp");
const User = require("../models/userSchema");
=======
const { encriptar } = require('../helpers/bcryptHelp');
const User = require('../models/userSchema')
var bcrypt = require('bcrypt');

var salt = 10;
var jwtHelper =require('../helpers/token')

>>>>>>> 2f9fb342509fd5bb44b66e7b06e22bf94e25a796

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
      .send({ ok: false, msg: "Error al intentar crear el usuario" });
  }
}

async function getUsers(req, res) {
  let page = parseInt(req.query.page);
  let limit = parseInt(req.query.limit);
  if (!page) page = 1;
  if (!limit) limit = 10;
  try {
    const count = await User.countDocuemnts();
    const users = await User
      .find({})
      .skip((page - 1) * 10)
      .limit(limit);
    let result = {
      totalPages: Math.ceil(count / limit),
      page: page,
      users,
    };
    if (page > 0) {
      result.previous = page - 1;
    }
    if (limit < count) {
      result.next = page + 1;
    }
    return res
      .status(200)
      .send({ ok: true, msg: "Usuarios obtenidos con exito", result });
  } catch (err) {
    return res
      .status(500)
      .send({
        ok: false,
        msg: "Se produjo un error al ontener los usuarios",
        err,
      });
  }
}

<<<<<<< HEAD
function getUser(req, res) {}

module.exports = {
  createUser,
  getUsers,
  getUser,
};
=======
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

        if (result) {
            user.password = undefined;
            const token = await jwtHelper.generateJWT(user);
            return res.status(200).send({
                ok: true,
                msg: 'Login correcto',
                user,
                token
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




module.exports = {
    crearUsuario,
    loginUsuario
}
>>>>>>> 2f9fb342509fd5bb44b66e7b06e22bf94e25a796
