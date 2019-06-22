const publicacionesControlador = {};
const fs = require('fs');
const path = require('path');
const multer = require('multer');


publicacionesControlador.hacerPublicacion = (req, res) => {
    //publicacion = {
    //    imagen: req.body.imagen
    //}
    console.log(req)
/*     res.json({
        type: true,
        data: 'publicacion creada'
    }); */
    
}

module.exports = publicacionesControlador;