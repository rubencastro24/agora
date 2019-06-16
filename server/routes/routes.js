const express = require('express');
const router = express.Router();

const usuarioControlador = require('../controllers/usuario.controlador');
const seguimientosControlador = require('../controllers/seguimientos.controlador');


/* Ruta para los controladores de Usuarios */
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
router.put('/api/seguimiento/:id', seguimientosControlador.cambiarSeguimiento);

router.get('/api/seguimiento/:id', seguimientosControlador.obtenerSeguimiento);
router.get('/api/seguidor/:id', seguimientosControlador.obtenerSeguidor);

router.get('/api/seguimientos/:id', seguimientosControlador.obtenerSeguimientos);
router.get('/api/seguidores/:id', seguimientosControlador.obtenerSeguidores);

    /* router.post('/api/seguimientos-nick:id', seguimientosControlador.obtenerSeguimientosNick); */
    router.post('/api/seguidores-nick', seguimientosControlador.obtenerUsuariosSeguidores);



module.exports = router;