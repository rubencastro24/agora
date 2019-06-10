const mongoose = require('mongoose');
const { Schema } = mongoose;

const SeguimientosSchema = new Schema ({
    usuario: { type: Schema.Types.ObjectId, required: true},
    sigue: { type: Schema.Types.ObjectId, required: true}
});

    /*  Usuario ejemplo
{
    "usuario": "",
    "sigue": "",
}
----------------------------------
{
    "usuario": "ruben_castro_24",
    "sigue": "mariamuot",
}
    */

module.exports = mongoose.model('seguimientos', SeguimientosSchema);