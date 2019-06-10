const mongoose = require('mongoose');

const URI = 'mongodb://localhost/agora'

mongoose.connect(URI, {useNewUrlParser: true})
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.error(err));

module.exports = mongoose;