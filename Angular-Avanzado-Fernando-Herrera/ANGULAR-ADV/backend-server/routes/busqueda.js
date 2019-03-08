// Requires (Librerias que va a tener el proyecto)
var express = require('express');

var app = express();

var Hospital = require('../models/hospital');
var Medico = require('../models/medico');
var Usuario = require('../models/usuario');

//=============================================================
// Busqueda por coleccion
//=============================================================

app.get('/colleccion/:tabla/:busqueda', (req, res) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');
    var tabla = req.params.tabla;
    var promesa;

    switch (tabla) {
        case 'usuarios':
            promesa = busquedaUsuario(regex);
            break;

        case 'medicos':
            promesa = busquedaMedicos(regex);
            break;

        case 'hospitales':
            promesa = busquedaHospitales(regex);
            break;

        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda sólo son: usuarios, medicos y hospitales',
                error: { mensaje: 'Tipo de tabla/coleccion no válido' }
            });
    }

    promesa.then(data => {

        res.status(200).json({
            ok: true,
            // [] con esto le decimos que no queremos el nombre tabla, si no el valor que contiene esa variable.
            [tabla]: data
        });

    });


});


//=============================================================
// Busqueda general
//=============================================================
app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    // la i quiere decir que le de igual may o minusculas
    var regex = new RegExp(busqueda, 'i');

    Promise.all([
            busquedaHospitales(regex),
            busquedaMedicos(regex),
            busquedaUsuario(regex)
        ])
        .then(respuestas => {
            res.status(200).json({
                ok: true,
                hospitales: respuestas[0],
                medicos: respuestas[1],
                usuarios: respuestas[2]
            });
        });


});

function busquedaHospitales(regex) {

    return new Promise((resolve, reject) => {

        Hospital.find({ nombre: regex })
            .populate('usuario', 'nombre email img')
            .exec((err, hospitales) => {

                if (err) {
                    reject('Error al Buscar hospitales', err);
                } else {
                    resolve(hospitales);
                }
            });
    });
}

function busquedaMedicos(regex) {

    return new Promise((resolve, reject) => {

        Medico.find({ nombre: regex })
            .populate('usuario', 'nombre email img')
            .populate('hospital')
            .exec((err, medicos) => {

                if (err) {
                    reject('Error al Buscar medicos', err);
                } else {
                    resolve(medicos);
                }
            });
    });
}


function busquedaUsuario(regex) {

    return new Promise((resolve, reject) => {
        // Quiero buscar por dos columas ( nombre y email - tabla: Usuarios)
        Usuario.find({}, 'nombre email role img')
            .or([{ 'nombre': regex }, { 'email': regex }])
            .exec((err, usuarios) => {

                if (err) {
                    reject('Error al cargar usuarios', err);
                } else {
                    resolve(usuarios);
                }
            });
    });
}




// Exportamos para poderlo utilizar en otros archivos
module.exports = app;