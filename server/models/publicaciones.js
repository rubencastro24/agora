const mongoose = require('mongoose');
const { Schema } = mongoose;

const publicacionesSchema = new Schema ({
    usuario: {type: Schema.Types.ObjectId, required: true},
    descripcion: {type: Schema.Types.string, required: false},
    fechaPublicacion: {type: Schema.Types.Date, required: false},
    comentarios: {
        type: [
            {
                usuario: {type: Schema.Types.String, required: true},
                comentario: {type: Schema.Types.String, required: true},
                fechaComentario: {type: Schema.Types.Date, required: true}
            }
        ],
        required: false
    },
    meGusta: {
        type: [
            {
                usuario: {type: Schema.Types.String, require: true},
                fechaMeGusta: {type: Schema.Types.Date, require: true}
            }
        ],
        required: false
    }
});

    /*  Publicación ejemplo
{
    "usuario": "ruben_castro_24", // _id
    "descripción": "Paisaje de mollina",
    "fechaPublicacion": "2019-06-18_18:39:47",
    "comentarios": {
        "usuario": "mariamuot", // _id
        "comentario": "Precioso paisaje",
        "fechaComentario": "2019-06-18_18:39:47"
    },
    "meGusta": {
        "usuario": "mariamuot", // _id
        "fechaMeGusta": "2019-06-18_18:39:47"
    },
}
    */

module.exports = mongoose.model('publicaciones', publicacionesSchema);