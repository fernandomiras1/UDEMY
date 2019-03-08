// Requires (Librerias que va a tener el proyecto)
var express = require('express');
var auth = require('../auth/auth');

var app = express();

//Obtenemos toda la tabla de medicos
var Medico = require('../models/medico');

//=============================================================
// Obtener todos los medicos
//=============================================================

app.get('/', (req, res, next) => {

    var desde = Number(req.query.desde) || 0;

    // Vamos a traer todos los medicos de la tabla: medicos
    Medico.find({})
        .skip(desde)
        .limit(5)
        // Busca en otras tablas o colecciones, en este caso necesito que me traiga todo el objeto usuario. 
        .populate('usuario', 'nombre email')
        .populate('hospital')
        .exec(
            (err, medicos) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando medico',
                        errors: err
                    });

                }


                // Contamos la cant de medicos y lo alamacentamos en total.
                Medico.count({}, (err, count) => {
                    res.status(200).json({
                        ok: true,
                        medicos: medicos,
                        total: count
                    });
                });

            });

});

//=============================================================
// Obtener Médico por ID
//=============================================================

app.get('/:id', (req, res) => {

    var id = req.params.id;

    Medico.findById(id)
        .populate('usuario', 'nombre email img')
        .populate('hospital')
        .exec((err, medico) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar medico',
                    errors: err
                });
            }

            if (!medico) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El medico con el id ' + id + ' no existe',
                    errors: { mensaje: 'No existe un medico con ese ID' }
                });

            }

            res.status(200).json({
                ok: true,
                medico: medico
            });


        })

})

//=============================================================
// Actualizar Medico
//=============================================================

app.put('/:id', auth.verificaToken, (req, res) => {

    // Obtenemos el id que le mandamos en el put.
    var id = req.params.id;
    var body = req.body;

    //Verificamos si el id exite en la db.
    Medico.findById(id, (err, medico) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar medico',
                errors: err
            });
        }

        if (!medico) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El medico con el id ' + id + ' no existe',
                errors: { mensaje: 'No existe un medico con ese ID' }
            });

        }

        // Agregamos los datos que se van a modificar en la db.
        medico.nombre = body.nombre;
        medico.usuario = req.usuarios._id;
        medico.hospital = body.hospital;

        // Modificamos los datos
        medico.save((err, medicoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar medico',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                medico: medicoGuardado
            });

        });

    });

});

//=============================================================
// Crear un nuevo medico
//=============================================================

app.post('/', auth.verificaToken, (req, res) => {

    // Usando Body Parser. Nos permite pasar todos los parametros que le pasamos al post lo tranforma en objeto en este 
    // caso con el nombre de 'body'. Muy facil.
    var body = req.body;

    // Definicion de un nuevo medico. (Lo igualamos a lo que esta en la db (tabla medicos en mongo))
    var medico = new Medico({
        nombre: body.nombre,
        usuario: req.usuarios._id,
        hospital: body.hospital
    });

    //Guardamos al medico
    medico.save((err, medicoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear medico',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            medico: medicoGuardado
        });
    });

});



//=============================================================
// Borrar un medico por el id
//=============================================================
app.delete('/:id', auth.verificaToken, (req, res) => {

    // Obtenemos el id que le mandamos en el put.
    var id = req.params.id;

    Medico.findByIdAndRemove(id, (err, medicoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar medico',
                errors: err
            });
        }

        if (!medicoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El medico con el id ' + id + ' no existe',
                errors: { mensaje: 'No existe un medico con ese ID' }
            });

        }

        res.status(200).json({
            ok: true,
            medico: medicoBorrado
        });

    });

});

// Exportamos para poderlo utilizar en otros archivos
module.exports = app;