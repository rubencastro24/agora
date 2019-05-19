const express = require('express');
const router = express.Router();

const usuario = require('../controllers/usuario.controlador')

router.get('/api/usuarios', usuario.obtenerUsuarios);
router.get('/api/usuarios/:id', usuario.obtenerUsuario);
router.post('/api/usuarios', usuario.crearUsuario);
router.put('/api/usuarios/:id', usuario.editarUsuario);
router.delete('/api/usuarios/:id', usuario.borrarUsuario);

module.exports = router;
