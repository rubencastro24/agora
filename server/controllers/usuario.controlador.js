const Usuarios = require('../models/usuario');
const usuarioCtrl = {};

usuarioCtrl.getUsuarios = async (req, res) => {
        //res.send('Usuarios!!');
        //res.json({status: 'Usuarios.'});
        const usuarios = await Usuarios.find()
        res.json(usuarios);
}

usuarioCtrl.createUsuario = async (req, res) => {
    const usuario = new Usuarios(req.body);
    await usuario.save();
    console.log(usuario);
    res.json({
        status: 'usuario creado'
    });
}

usuarioCtrl.getUsuario = async (req, res) => {
    const usuario = await Usuarios.findById(req.params.id);
    res.json(usuario);
}

usuarioCtrl.editUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        edad: req.body.edad
    }
    await Usuarios.findByIdAndUpdate(id, {$set: usuario}, {$new: true});
    res.json({
        status: 'Usuario editado'
    });
}

usuarioCtrl.deleteUsuario = async (req, res) => {
    await Usuarios.findByIdAndRemove(req.params.id)
    res.json({
        status: 'Usuario eliminado.'
    });
}

module.exports = usuarioCtrl;