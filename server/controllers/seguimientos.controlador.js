const UsuariosModelo = require('../models/usuario');
const SeguimientosModelo = require('../models/seguimientos');
const seguimientosControlador = {};



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





seguimientosControlador.obtenerSeguimiento = async (req, res) => {
    buscarSeguimiento= {
        usuario: req.tokenDescodificado.idUsuario,
        sigue: req.params.id
    }
    console.log(buscarSeguimiento)
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





seguimientosControlador.obtenerSeguidor = async (req, res) => {
    buscarSeguidor= {
        usuario: req.params.id,
        sigue: req.tokenDescodificado.idUsuario
    }
    console.log(buscarSeguidor)
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




seguimientosControlador.obtenerSeguimientos = async (req, res) => {
    usuario = {
        usuario: req.params.id
    }
    await SeguimientosModelo.find(
        usuario,
        (err, seguimientos) => {
            if (err) {
                res.json({
                    type: false,
                    data: "segumientos fallido: " + err
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
                    res.json({
                        type: true,
                        seguimientos: true,
                        data: seguimientos
                    });
                }
            }
        }
    );
}





seguimientosControlador.obtenerSeguidores = async (req, res) => {
    usuario = {
        sigue: req.params.id
    }
    await SeguimientosModelo.find(
        usuario,
        {_id:0,usuario:1},
        (err, seguidores) => {
            if (err) {
                res.json({
                    type: false,
                    data: "segumientos fallido: " + err
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
                    res.json({
                        type: true,
                        seguidores: true,
                        data: seguidores
                    });
                }
            }
        }
    );
}




















seguimientosControlador.obtenerUsuariosSeguidores = async (req, res) => {
    var seguidoresUsuariosObjeto = req.body;
    
    var seguidoresArray=[];
    for (let i = 0; i < seguidoresUsuariosObjeto.length; i++) {
        seguidoresArray.push(seguidoresUsuariosObjeto[i].usuario)
    }

    await UsuariosModelo.find(
        { _id : { $in : seguidoresArray }},
        { nick : 1 },
        (err, usuarios) => {
            if (err) {
                res.json({
                    type: false,
                    data: "usuarios fallido: " + err
                });
            }
            else {
                if (!usuarios) {
                    res.json({
                        type: true,
                        usuarios: false,
                        data: "usuarios no encontrados."
                    });
                }
                else {
                    res.json({
                        type: true,
                        usuarios: true,
                        data: usuarios
                    });
                }
            }
        }
    );
}


















module.exports = seguimientosControlador;