const UsuariosModelo = require('../models/usuario');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const jwtSecret = process.env.JWT_SECRET || 'AgoraClaveSecretaJWT';
const usuarioControlador = {};

usuarioControlador.obtenerUsuarios = async (req, res) => {
    await UsuariosModelo.find(
        function (err, usuarios) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error: " + err
                });
            }
            else {
                if (!usuarios) {
                    res.json({
                        type: false,
                        data: "Usuarios no encontrados "
                    });
                }
                else {
                    res.json({
                        type: true,
                        usuarios
                    });
                }
            }
        })
}

usuarioControlador.obtenerUsuariosBusqueda = async (req, res) => {
    const nick = req.params.nick;
    await UsuariosModelo.find(
        { "nick" : {$regex: nick, $options: 'i' } },
        function (err, usuarios) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error: " + err
                });
            }
            else {
                if (!usuarios) {
                    res.json({
                        type: false,
                        data: "Usuarios no encontrados."
                    });
                }
                else {
                    res.json({
                        type: true,
                        usuarios
                    });
                }
            }
        }
    );
}

usuarioControlador.obtenerUsuario = async (req, res) => {
    await UsuariosModelo.findById(
        req.params.id,
        function (err, usuario) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error: " + err
                });
            }
            else {
                if (!usuario) {
                    res.json({
                        type: false,
                        data: "Usuario no encontrado."
                    });
                }
                else {
                    res.json({
                        type: true,
                        usuario
                    });
                }
            }
        }
    );
}

/* usuarioControlador.crearUsuario = async (req, res) => {
    const usuario = new UsuariosModelo(req.body);
    await usuario.save();
    console.log(usuario);
    res.json({
        data: 'usuario creado'
    });
} */

usuarioControlador.editarUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = {
        nick: req.body.nick,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        descripcion: req.body.descripcion,
        pass: req.body.pass,
        fechaNacimiento: new Date(req.body.fechaNacimiento.año, req.body.fechaNacimiento.mes - 1, req.body.fechaNacimiento.dia)
    }
    console.log(usuario.nick);
    await UsuariosModelo.findOne({ "nick": usuario.nick }, function (err, nick) {
        if (err) {
            res.json({
                type: false,
                data: "Error al buscar: " + err
            });
        }
        else {
            if (nick && nick.nick == usuario.nick && id != nick._id) {
                res.json({
                    type: false,
                    nick,
                    data: "nick en uso"
                });
            }
            else {
                UsuariosModelo.findByIdAndUpdate(id, {$set: usuario}, {$new: true}, function (err, editado) {
                    if (err) {
                        res.json({
                            type: false,
                            nick,
                            data: "Error al modificar: " + err
                        });
                    }
                    else {
                        if (!editado) {
                            res.json({
                                type: false,
                                editado,
                                data: "no se pudo editar."
                            });
                        }
                        else {
                            res.json({
                                type: true,
                                editado,
                                data: "usuario editado"
                            });
                        }
                    }
                });
            }
        }
    });
}

usuarioControlador.borrarUsuario = async (req, res) => {
    await UsuariosModelo.findByIdAndRemove(req.params.id);
    res.json({
        data: 'Usuario eliminado.'
    });
}






usuarioControlador.iniciarSesion = async (req, res) => {
    req.body.nick = req.body.nick.toLowerCase();
    const usuarioIniciarSesion = {
        nick: req.body.nick,
        pass: req.body.pass
    }
    await UsuariosModelo.findOne(usuarioIniciarSesion, function(err, usuario) {
        if (err) {
            res.json({
                type: false,
                data: "Error: " + err
            });
        }
        else {
            if (!usuario) {
                res.json({
                    type: false,
                    data: "nick o contraseña incorrecta."
                });    
            }
            else {
                var token = jwt.sign({idUsuario: usuario._id}, jwtSecret, {expiresIn: '24h'});
                res.json({
                    type: true,
                    data: usuario,
                    token
                }); 
            }
        }
    });
}

usuarioControlador.registrarse = async (req, res) => {
    req.body.nick = req.body.nick.toLowerCase();
    await UsuariosModelo.findOne({ "nick": req.body.nick }, function(err, usuarioEncontrado) {
        if (err) {
            res.json({
                type: false,
                data: "Error: " + err
            });
        }
        else {
            if ( usuarioEncontrado ) {
                if (usuarioEncontrado.nick = req.body.nick) {
                    res.json({
                        type: false,
                        data: "El usuario ya existe.",
                        nick: usuarioEncontrado.nick
                    });
                }
            }
            else {
                var usuarioCrear = new UsuariosModelo();
                    usuarioCrear.nick = req.body.nick;
                    usuarioCrear.pass = req.body.pass;
                    usuarioCrear.nombre = req.body.nombre;
                    usuarioCrear.apellidos = req.body.apellidos;
                    usuarioCrear.fechaNacimiento = new Date(req.body.fechaCumple.año, req.body.fechaCumple.mes - 1, req.body.fechaCumple.dia);
                    usuarioCrear.fechaCreacionUsuario = new Date();
                usuarioCrear.save();
                var token = jwt.sign({idUsuario: usuarioCrear._id}, jwtSecret, {expiresIn: '24h'});
                res.json({
                    type: true,
                    data: usuarioCrear,
                    token
                })
            }
        }
    });
}

usuarioControlador.comprobarToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, jwtSecret, (err, tokenDescodificado) => {
            if (err) {
                res.status(401).json({
                    type: false,
                    data: "autenticación fallida: " + err
                });
            }
            else {
                req.tokenDescodificado = tokenDescodificado;
                next();
            }
        });
    }
    else {
        res.status(401).json({
            type: false,
            data: "Necesitas un token."
        });
    }
}

usuarioControlador.getComprobarToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, jwtSecret, (err, tokenDescodificado) => {
            if (err) {
                res.json({
                    type: false,
                    tokenValido: false,
                    data: "autenticación fallida: " + err
                });
            }
            else {
                req.tokenDescodificado = tokenDescodificado;
                if (!tokenDescodificado){
                    res.json({
                        type: false,
                        tokenValido: false,
                        data: "autenticación fallida: "
                    });
                }
                else {
                    res.json({
                        type: true,
                        tokenValido: true,
                        tokenDescodificado
                    })
                }
            }
        });
    }
    else {
        res.status(403).json({
            type: false,
            data: "Necesitas un token."
        });
    }
}

usuarioControlador.getComprobarTokenBool = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        res.status(403).json({
            type: false
        });
    }
    else {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                res.json({
                    type: false
                });
            }
            else {
                req.decoded = decoded;
                res.json({
                    type: true
                })
            }
        });
    }
}



module.exports = usuarioControlador;