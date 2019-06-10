const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema ({
    nick: { type: Schema.Types.String, required: true},
    pass: { type: Schema.Types.String, required: true},
    nombre: { type: Schema.Types.String, required: true},
    apellidos: { type: Schema.Types.String, required: true},
    descripcion: { type: Schema.Types.String, required: false},
    fechaNacimiento: { type: Schema.Types.Date, required: true},
    fechaCreacionUsuario: { type: Schema.Types.Date, required: true}
});

    /*  Usuario ejemplo
{
    "nick": "ruben_castro_24",
    "pass": "Ru12345.",
    "nombre": "Rubén",
    "apellidos": "Castro Ruiz",
    "descripcion": "Me gusta jugar al futbol.",
    "fechaNacimiento": {
        "dia": 3,
        "mes": 3,
        "año": 1999
    }
}
{
    "nick": "mireyap22",
    "pass": "1999",
    "nombre": "Mireya",
    "apellidos": "Peña Espinosa",
    "descripcion": "",
    "fechaNacimiento": {
        "dia": 17,
        "mes": 6,
        "año": 1999
    }
}
    */

module.exports = mongoose.model('Usuarios', UsuarioSchema);