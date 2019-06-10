const express = require('express');
const router = express.Router();


/* Ruta para los controladores de Usuarios */
const usuarioControlador = require('../controllers/usuario.controlador');

router.post('/api/iniciar-sesion', usuarioControlador.iniciarSesion);
router.post('/api/registrarse', usuarioControlador.registrarse);
router.get('/api/comprobar-token', usuarioControlador.getComprobarToken);
router.get('/api/comprobar-token-bool', usuarioControlador.getComprobarTokenBool);

/* Midleware comprobador de token */
    router.use(usuarioControlador.comprobarToken);

router.get('/api/usuarios', usuarioControlador.obtenerUsuarios);
router.get('/api/usuarios/buscar/:nick', usuarioControlador.obtenerUsuariosBusqueda);
router.get('/api/usuarios/:id', usuarioControlador.obtenerUsuario);
/* router.post('/api/usuarios', usuarioControlador.crearUsuario); */
router.put('/api/usuarios/:id', usuarioControlador.editarUsuario);
router.delete('/api/usuarios/:id', usuarioControlador.borrarUsuario);


/* Ruta para los controladores de Usuarios */
const seguimientosControlador = require('../controllers/seguimientos.controlador');

router.get('/api/seguimientos/:id', seguimientosControlador.obtenerSeguimientos);
router.get('/api/seguimientos/:id', seguimientosControlador.obtenerSeguimiento);
router.get('/api/seguidores/:id', seguimientosControlador.obtenerSeguidores);
router.get('/api/seguidores/:id', seguimientosControlador.obtenerSeguidor);
router.put('/api/seguimientos/:id', seguimientosControlador.cambiarSeguimiento);


module.exports = router;