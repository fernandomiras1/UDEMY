// Requires (Librerias que va a tener el proyecto)
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

app.get('/:tipo/:img', (req, res, next) => {

    var img = req.params.img;
    var tipo = req.params.tipo;

    var pathImagen = path.resolve(__dirname, `../uploads/${ tipo }/${ img }`);

    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        var pathNoImage = path.resolve(__dirname, '../assets/no-img.jpg');
        res.sendFile(pathNoImage);
    }
});

// Exportamos para poderlo utilizar en otros archivos
module.exports = app;