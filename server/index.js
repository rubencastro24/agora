// requerimientos.
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const { mongoose } = require('./database');

// Configuración.
app.set('port', process.env.PORT || 3000);

// Middlewares.
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

// Rutas.
app.use(require('./routes/routes'));

// Arrancar el servidor.
app.listen(
    app.get('port'),
    () => {
        console.log('Servidor en el puerto :', app.get('port'));
    }
);
