const Menu = require('../schema/menuSchema');


async function createMenu (req,res){
    const body = req.body;
    if(!body.nombre || !body.descripcion)return res.status(400).send({ok:false, msg:'Ingrese los campos requeridos'})
    try{
        const menu = new Menu(body);
        await menu.save();
        return res.status(200).send({ok:true, msg:'Menu creado con exito'});
    }catch(err){
        return res.status(500).send({ok:false, msg:'Error al crear el menu', err})
    }
}

async function getMenus(req,res){
    try{
        const menus = await Menu.find({});
        return res.status(200).send({ok:true, msg:'Menus obtenidos exitosamente', menus})
    }catch(err){
        return res.status(500).send({ok:false, msg:'Error al obtener menus', err})
    }
}


module.exports = {
    createMenu,
    getMenus,
}