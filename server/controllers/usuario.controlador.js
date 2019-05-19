const Usuarios = require('../models/usuario');
const usuarioCtrl = {};

usuarioCtrl.obtenerUsuarios = async (req, res) => {
    const usuarios = await Usuarios.find()
    res.json(usuarios);
}

usuarioCtrl.obtenerUsuario = async (req, res) => {
    const usuario = await Usuarios.findById(req.params.id);
    res.json(usuario);
}

usuarioCtrl.crearUsuario = async (req, res) => {
    const usuario = new Usuarios(req.body);
    await usuario.save();
    console.log(usuario);
    res.json({
        status: 'usuario creado'
    });
}

usuarioCtrl.editarUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = {
        nick: req.body.nick,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        edad: req.body.edad
    }
    await Usuarios.findByIdAndUpdate(id, {$set: usuario}, {$new: true});
    res.json({
        status: 'Usuario editado'
    });
}

usuarioCtrl.borrarUsuario = async (req, res) => {
    await Usuarios.findByIdAndRemove(req.params.id)
    res.json({
        status: 'Usuario eliminado.'
    });
}

module.exports = usuarioCtrl;