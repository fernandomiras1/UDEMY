// Requires (Librerias que va a tener el proyecto)
var express = require('express');
var auth = require('../auth/auth');

var app = express();

//Obtenemos toda la tabla de hospitales
var Hospital = require('../models/hospital');

//=============================================================
// Obtener todos los hospitales
//=============================================================

app.get('/', (req, res, next) => {

    var desde = Number(req.query.desde) || 0;

    // Vamos a traer todos los hospitales de la tabla: hospitales
    Hospital.find({})
    .skip(desde)
    .limit(5)
       // Busca en otras tablas o colecciones, en este caso necesito que me traiga todo el objeto usuario. 
        .populate('usuario', 'nombre email')
        .exec(
            (err, hospitales)=> {

                if (err) {
                  return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando hospital',
                        errors: err
                    });
        
                }

                // Contamos la cant de hospitales y lo alamacentamos en total.
                Hospital.count({}, (err, count) => {
                    res.status(200).json({
                        ok: true,
                        hospitales: hospitales,
                        total: count
                    });
                });         
                
            });

});


//=============================================================
// Actualizar hospital
//=============================================================

app.put('/:id', auth.verificaToken, (req, res) => {

    // Obtenemos el id que le mandamos en el put.
    var id = req.params.id;
    var body = req.body;

    //Verificamos si el id exite en la db.
    Hospital.findById(id, (err, hospital) => {

        if (err) {
            return res.status(500).json({
                 ok: false,
                 mensaje: 'Error al buscar hospital',
                 errors: err
             });
         }

         if (!hospital) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El hospital con el id ' + id + ' no existe',
                errors: { mensaje: 'No existe un hospital con ese ID' }
            });

         }

         // Agregamos los datos que se van a modificar en la db.
         hospital.nombre = body.nombre;
         hospital.usuario = req.usuarios._id;

         // Modificamos los datos
         hospital.save( (err, hospitalGuardado) => {

            if (err) {
                return res.status(400).json({
                     ok: false,
                     mensaje: 'Error al actualizar hospital',
                     errors: err
                 });
            }

            res.status(200).json({
                ok: true,
                hospital: hospitalGuardado
            });

         });

    });
  
}); 


//=============================================================
// Obtener Hospital por ID
//=============================================================

app.get('/:id', (req, res) => {

    var id = req.params.id;

    Hospital.findById(id)
        .populate('usuario', 'nombre img email')
        .exec((err, hospital) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar hospital',
                    errors: err
                });
            }

            if (!hospital) {
                res.status(400).json({
                    ok: false,
                    mensaje: 'El hospital con el id' + id + 'no existe',
                    errors: {mensaje: 'No existe un hospital con ese ID'}
                });
            }

            res.status(200).json({
                ok: true,
                hospital: hospital
            });

        })
});
    
//=============================================================
// Crear un nuevo hospital
//=============================================================

app.post('/', auth.verificaToken, (req, res) => {

   // Usando Body Parser. Nos permite pasar todos los parametros que le pasamos al post lo tranforma en objeto en este 
   // caso con el nombre de 'body'. Muy facil.
    var body = req.body;

    // Definicion de un nuevo hospital. (Lo igualamos a lo que esta en la db (tabla hospitals en mongo))
    var hospital = new Hospital({
        nombre: body.nombre,
        usuario: req.usuarios._id
    });

    //Guardamos al hospital
    hospital.save((err, hospitalGuardado) => {

        if (err) {
           return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear hospital',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            hospital: hospitalGuardado
        });
    });
    
});



//=============================================================
// Borrar un hospital por el id
//=============================================================
app.delete('/:id', auth.verificaToken, (req, res) => {

     // Obtenemos el id que le mandamos en el put.
     var id = req.params.id;
    
     Hospital.findByIdAndRemove(id, (err, hospitalBorrado) => {

        if (err) {
            return res.status(500).json({
                 ok: false,
                 mensaje: 'Error al borrar hospital',
                 errors: err
             });
         }

         if (!hospitalBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El hospital con el id ' + id + ' no existe',
                errors: { mensaje: 'No existe un hospital con ese ID' }
            });

         }
 
         res.status(200).json({
             ok: true,
             hospital: hospitalBorrado
         });

     });

});

// Exportamos para poderlo utilizar en otros archivos
module.exports = app;