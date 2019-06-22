// requerimientos.
const express = require('express');
const app = express();

const { mongoose } = require('./database');
const http = require('http');
const https = require('https');

const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Configuración.
app.set('httpPort', process.env.HTTP_PUERTO || 80);
app.set('httpsPort', process.env.HTTPS_PUERTO || 443);
app.set('salt', process.env.SALT || 10);
app.set('jwtSecret', process.env.JWT_SECRET || fs.readFileSync(__dirname + '/jwt.key'));
    console.log("jwtSecret: " + app.get('jwtSecret'));

// Middlewares.
//Set Request Size Limit
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({origin: 'http://localhost:4200'}));
/* app.use(expressJwt({secret: app.get('jwtSecret')}).unless({path: ['/api/iniciar-sesion']})); */
app.use(express.static(path.join(__dirname, 'imagenes/publicaciones')));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, x-access-token');
    next();
});

// Rutas.
app.use(require('./routes/routes'));

// Arrancar el servidor. Demonio.
var credenciales = {
    key: fs.readFileSync(__dirname + '/agora.key').toString(),
    cert: fs.readFileSync(__dirname + '/agora.crt').toString()
};

http.createServer(app).listen(app.get('httpPort'), function(){
        console.log("Servidor http en el puerto " + app.get('httpPort'));
    }
);
https.createServer(credenciales, app).listen(app.get('httpsPort'), function(){
        console.log("Servidor https en el puerto " + app.get('httpsPort'));
    }
);