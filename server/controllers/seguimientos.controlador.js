const UsuariosModelo = require('../models/usuario');
const SeguimientosModelo = require('../models/seguimientos');
const seguimientosControlador = {};

/* --------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------------------------------------------------------- */

seguimientosControlador.cambiarSeguimiento = async (req, res) => {
    const seguimiento = {
        usuario: req.tokenDescodificado.idUsuario,
        sigue: req.params.id
    }
    await SeguimientosModelo.findOne(seguimiento, function(err, sigue) {
        if (err) {
            res.json({
                type: false,
                cambio: false,
                data: "Error: " + err
            });
        }
        else {
            if (sigue) {
                SeguimientosModelo.findByIdAndRemove(sigue._id, function(err, borrado){
                    if (err) {
                        res.json({
                            type: false,
                            cambio: false,
                            data: "Error borrar seguimiento: " + err
                        });
                    }
                    else {
                        if (!borrado) {
                            res.json({
                                type: true,
                                cambio: false,
                                data: "Error borrar seguimiento."
                            });
                        }
                        else {
                            res.json({
                                type: true,
                                cambio: true,
                                status: 'seguimiento borrado'
                            });
                        }
                    }
                }
                );
            }
            else {
                var guardarSeguimiento = new SeguimientosModelo(seguimiento);
                    guardarSeguimiento.fecha = new Date();
                guardarSeguimiento.save(function (err, creado) {
                    if (err) {
                        res.json({
                            type: false,
                            cambio: false,
                            data: "Error de seguimiento: " + err
                        });
                    }
                    else {
                        if (!creado) {
                            res.json({
                                type: true,
                                cambio: false,
                                data: "Error de seguimiento."
                            });
                        }
                        else {
                            res.json({
                                type: true,
                                cambio: true,
                                status: 'seguimiento creado',
                                seguimiento: creado
                            });
                        }
                    }
                });
            }
        }
    });
}

/* --------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------------------------------------------------------- */

seguimientosControlador.obtenerSeguimiento = async (req, res) => {
    buscarSeguimiento= {
        usuario: req.tokenDescodificado.idUsuario,
        sigue: req.params.id
    }
    await SeguimientosModelo.findOne(
        buscarSeguimiento,
        (err, seguimiento) => {
            if (err) {
                res.json({
                    type: false,
                    data: "segumiento fallido: " + err
                });
            }
            else {
                if (!seguimiento) {
                    res.json({
                        type: true,
                        seguimiento: false,
                        data: "seguimiento no encontrado."
                    });
                }
                else {
                    res.json({
                        type: true,
                        seguimiento: true,
                        data: seguimiento
                    });
                }
            }
        }
    );
}

/* --------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------------------------------------------------------- */

seguimientosControlador.obtenerSeguidor = async (req, res) => {
    buscarSeguidor= {
        usuario: req.params.id,
        sigue: req.tokenDescodificado.idUsuario
    }
    await SeguimientosModelo.findOne(
        buscarSeguidor,
        (err, seguidor) => {
            if (err) {
                res.json({
                    type: false,
                    data: "segumiento fallido: " + err
                });
            }
            else {
                if (!seguidor) {
                    res.json({
                        type: true,
                        seguidor: false,
                        data: "seguidor no encontrado."
                    });
                }
                else {
                    res.json({
                        type: true,
                        seguidor: true,
                        data: seguidor
                    });
                }
            }
        }
    );
}

/* --------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------------------------------------------------------- */

seguimientosControlador.obtenerUsuariosSeguimientos = async (req, res) => {
    await SeguimientosModelo.find(
        {usuario: req.params.id},
        {_id:0, sigue:1},
        (err, seguimientos) => {
            if (err){
                res.json({
                    type: false,
                    seguimientos: false,
                    data: "seguimientos fallidos: " + err
                });
            }
            else {
                if (!seguimientos) {
                    res.json({
                        type: true,
                        seguimientos: false,
                        data: "seguimientos no encontrados."
                    });
                }
                else {
                    var seguimientosId = seguimientos.map(
                        function(seguimientos) {
                            return seguimientos.sigue
                        },
                    )
                    UsuariosModelo.find(
                        { _id: { $in : seguimientosId } },
                        {nick:1},
                        (err, usuarios) => {
                            if (err) {
                                res.json({
                                    type: false,
                                    data: "usuarios seguimientos fallidos: " + err
                                });
                            }
                            else {
                                if (!usuarios) {
                                    res.json({
                                        type: true,
                                        seguimientos: false,
                                        data: "usuarios seguimientos no encontrados."
                                    });
                                }
                                else {
                                    res.json({
                                        type: true,
                                        seguimientos: true,
                                        data: usuarios
                                    });
                                }
                            }
                        }
                    );
                }
            }
        }
    );
}

/* --------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------------------------------------------------------- */

seguimientosControlador.obtenerUsuariosSeguidores = async (req, res) => {
    await SeguimientosModelo.find(
        {sigue: req.params.id},
        {_id:0, usuario:1},
        (err, seguidores) => {
            if (err){
                res.json({
                    type: false,
                    seguidores: false,
                    data: "seguidores fallidos: " + err
                });
            }
            else {
                if (!seguidores) {
                    res.json({
                        type: true,
                        seguidores: false,
                        data: "seguidores no encontrados."
                    });
                }
                else {
                    var seguidoresId = seguidores.map(
                        function(seguidores) {
                            return seguidores.usuario
                        },
                    )
                    UsuariosModelo.find(
                        { _id: { $in : seguidoresId } },
                        {nick:1},
                        (err, usuarios) => {
                            if (err) {
                                res.json({
                                    type: false,
                                    data: "usuarios seguidores fallidos: " + err
                                });
                            }
                            else {
                                if (!usuarios) {
                                    res.json({
                                        type: true,
                                        seguidores: false,
                                        data: "usuarios seguidores no encontrados."
                                    });
                                }
                                else {
                                    res.json({
                                        type: true,
                                        seguidores: true,
                                        data: usuarios
                                    });
                                }
                            }
                        }
                    );
                }
            }
        }
    );
}

/* --------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------------------------------------------------------- */

module.exports = seguimientosControlador;