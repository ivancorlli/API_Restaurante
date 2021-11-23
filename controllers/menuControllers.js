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

function updateMenu (req, res){
    const id = req.params.id;
    const updateData = req.body;
    // if(req.user.role === 'ADMIN' && req.user._id !== id) {
    //     return res.status(401).send ({
    //         ok: false,
    //         msg: 'No tiene permisos para modificar '
    //     })
    // }

    Menu.findByIdAndUpdate(id, updateData, {
        new: true
    }, (error, menuUpdated) => {
        if (error) return res.status(500).send ({
            ok:false,
            msg: 'no se pudo actualizar el menu',
            error
        })
        if(!menuUpdated) return res.status(404).send({
            ok:false,
            msg: 'menu no encontrado'
        })
        return res.status(200).send ({
            ok:true,
            msg: 'menu actualizado',
            menuUpdated
        })
    })
}

function deleteMenu (req,res) {
    const id = req.params.id;

    Menu.findByIdAndDelete (id, (error, menuDeleted) => {
        if(error) return res.status(500).send ({
            ok:false,
            msg: 'No se pudo borrar el menu',
            error
        });
        if(!menuDeleted) return res.status(404).send ({
            ok:false,
            msg:'menu no encontrado'
        })
        return res.status(200).send ({
            ok: true,
            msg: 'usuario borrado correctamente',
            menuDeleted
        })
    })
}


module.exports = {
    createMenu,
    getMenus,
    updateMenu,
    deleteMenu
}