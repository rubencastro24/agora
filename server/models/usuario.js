const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema ({
    nick: { type: String, required: true},
    nombre: { type: String, required: true},
    apellidos: { type: String, required: true},
    edad: { type: Number, required: true}
});

/*{"nick": "ruben_castro_24", "nombre": "Rubén", "apellidos": "Castro Ruiz", "edad": 20}*/

module.exports = mongoose.model('Usuario', UsuarioSchema);
