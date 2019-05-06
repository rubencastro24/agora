const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema ({
    nombre: { type: String, required: true},
    apellidos: { type: String, required: true},
    edad: { type: Number, required: true}
});

/*
    {
        "nombre": "Pablo",
        "apellidos": "Amador Luque",
        "edad": 19
    }
*/

module.exports = mongoose.model('Usuario', UsuarioSchema);
