const UsuariosModelo = require('../models/usuario');
const SeguimientosModelo = require('../models/seguimientos');
const seguimientosControlador = {};

seguimientosControlador.obtenerSeguimientos = async (req, res) => {
    const seguimientos = await SeguimientosModelo.find()
    res.json(seguimientos);
}

seguimientosControlador.obtenerSeguimiento = async (req, res) => {
    const seguimiento = await UsuariosModelo.findById(req.params.id);
    res.json(seguimiento);
}

seguimientosControlador.obtenerSeguidores = async (req, res) => {
    const seguimientos = await SeguimientosModelo.find()
    res.json(seguimientos);
}

seguimientosControlador.obtenerSeguidor = async (req, res) => {
    const seguimiento = await UsuariosModelo.findById(req.params.id);
    res.json(seguimiento);
}

seguimientosControlador.cambiarSeguimiento = async (req, res) => {
    const seguimiento = {
        usuario: req.body.usuario,
        sigue: req.body.sigue
    }
    await SeguimientosModelo.findOne(seguimiento, function(err, sigue) {
        if (err) {
            res.json({
                type: false,
                data: "Error: " + err
            });
        }
        else {
            if (sigue) {
                console.log(sigue);
                SeguimientosModelo.findByIdAndRemove(sigue._id, function(err, borrado){
                    if (err) {
                        res.json({
                            type: false,
                            data: "Error: " + err
                        });
                    }
                    else {
                        if (!borrado) {
                            res.json({
                                type: false,
                                data: "Error de id"
                            });
                        }
                        else {
                            res.json({
                                type: true,
                                seguimiento: sigue,
                                status: 'seguimiento borrado'
                            });
                        }
                    }
                }
                );
            }
            else {
                var guardarSeguimiento = new SeguimientosModelo(seguimiento);
                guardarSeguimiento.save(function (err, creado) {
                    if (err) {
                        res.json({
                            type: false,
                            data: "Error: " + err
                        });
                    }
                    else {
                        if (!creado) {
                            res.json({
                                type: false,
                                data: "Error de id de usuarios"
                            });
                        }
                        else {
                            res.json({
                                type: true,
                                seguimiento: guardarSeguimiento,
                                status: 'seguimiento creado'
                            });
                        }
                    }
                });
            }
        }
    });
}

module.exports = seguimientosControlador;