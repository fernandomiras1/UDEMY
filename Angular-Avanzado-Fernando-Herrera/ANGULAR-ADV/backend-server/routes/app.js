// Requires (Librerias que va a tener el proyecto)
var express = require('express');

var app = express();

app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});

// Exportamos para poderlo utilizar en otros archivos
module.exports = app;