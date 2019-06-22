const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');
const multer = require('multer');
const imagenesSubidas = multer({
        dest: path.join(__dirname, '../imagenes/publicaciones')
})

const usuarioControlador = require('../controllers/usuario.controlador');
const seguimientosControlador = require('../controllers/seguimientos.controlador');
const publicacionesControlador = require('../controllers/publicaciones.controlador');

/* Ruta de inicio */
router.get('/',(req, res) => {res.json({type:true, data: 'Bienvenido a Ágora'});});
router.get('/api',(req, res) => {res.json({type:true, data: 'Bienvenido a la API de Ágora'});});

/* Ruta de imagenes */
router.get('/api/imagenes/publicaciones', (req, res) => { res.json({type:true, data: 'Bienvenido a la API de Ágora'}); });

/* Ruta para los controladores de Usuarios */
router.post('/api/iniciar-sesion', usuarioControlador.iniciarSesion);
router.post('/api/registrarse', usuarioControlador.registrarse);
router.get('/api/comprobar-token', usuarioControlador.getComprobarToken);
router.get('/api/comprobar-token-bool', usuarioControlador.getComprobarTokenBool);

    /* Midleware */
        /* comprobador de token y proteger siguientes rutas */
            router.use(usuarioControlador.comprobarToken);
        /* Hacer publicas las imágenes */

router.get('/api/usuarios', usuarioControlador.obtenerUsuarios);
router.get('/api/usuarios/buscar/:nick', usuarioControlador.obtenerUsuariosBusqueda);
router.get('/api/usuarios/:id', usuarioControlador.obtenerUsuario);
/* router.post('/api/usuarios', usuarioControlador.crearUsuario); */
router.put('/api/usuarios/:id', usuarioControlador.editarUsuario);
router.delete('/api/usuarios/:id', usuarioControlador.borrarUsuario);



/* Ruta para los controladores de Seguimientos */
router.put('/api/seguimiento/:id', seguimientosControlador.cambiarSeguimiento);

router.get('/api/seguimiento/:id', seguimientosControlador.obtenerSeguimiento);
router.get('/api/seguidor/:id', seguimientosControlador.obtenerSeguidor);

router.get('/api/seguidores/:id', seguimientosControlador.obtenerUsuariosSeguidores);
router.get('/api/seguimientos/:id', seguimientosControlador.obtenerUsuariosSeguimientos);



/* Ruta para los controladores de Publicaciones */
    /* const storage = multer.diskStorage({
        destination: path.join(__dirname, 'imagenes/publicaciones')
    })
    router.use(multer({storage}).single('imagen')); */
    
router.post('/api/publicaciones', imagenesSubidas.single('imagen'), function (req, res, next) {
    res.json({
        type: true,
        data: 'publicacion creada'
    });
    console.log(req.file);
    next()
})
    
/* router.post('/api/publicaciones/', publicacionesControlador.hacerPublicacion); */

module.exports = router;