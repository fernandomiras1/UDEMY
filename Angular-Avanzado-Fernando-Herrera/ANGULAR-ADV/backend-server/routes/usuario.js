// Requires (Librerias que va a tener el proyecto)
var express = require('express');
var bcrypt = require('bcryptjs');
var auth = require('../auth/auth');

var app = express();

//Obtenemos toda la tabla de usuarios
var Usuario = require('../models/usuario');

//=============================================================
// Obtener todos los usuarios
//=============================================================

app.get('/', (req, res, next) => {

    var desde = Number(req.query.desde) || 0;

    // Vamos a traer todos los usuarios de la tabla: usuarios
    Usuario.find({}, 'nombre email img role google')
        .skip(desde)
        .limit(5)
        .exec(
            (err, usuarios) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuario',
                        errors: err
                    });

                }

                // Contamos la cant de usuarios y lo alamacentamos en total.
                Usuario.count({}, (err, count) => {

                    res.status(200).json({
                        ok: true,
                        usuarios: usuarios,
                        total: count
                    });
                });

            });


});

//=============================================================
// Actualizar usuario
//=============================================================

app.put('/:id', [auth.verificaToken, auth.verificaADMIN_ROLE_o_MismoUsuario], (req, res) => {

    // Obtenemos el id que le mandamos en el put.
    var id = req.params.id;
    var body = req.body;

    //Verificamos si el id exite en la db.
    Usuario.findById(id, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { mensaje: 'No existe un usuario con ese ID' }
            });

        }

        // Agregamos los datos que se van a modificar en la db.
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        // Modificamos los datos
        usuario.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            // No mostramos el password. 
            usuarioGuardado.password = 'null';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });

        });

    });

});

//=============================================================
// Crear un nuevo usuario
//=============================================================

app.post('/', (req, res) => {

    // Usando Body Parser. Nos permite pasar todos los parametros que le pasamos al post lo tranforma en objeto en este 
    // caso con el nombre de 'body'. Muy facil.
    var body = req.body;

    // Definicion de un nuevo usuario. (Lo igualamos a lo que esta en la db (tabla usuarios en mongo))
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    //Guardamos al Usuario
    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado
        });
    });

});


//=============================================================
// Borrar un usuario por el id
//=============================================================
app.delete('/:id', [auth.verificaToken, auth.verificaADMIN_ROLE], (req, res) => {

    // Obtenemos el id que le mandamos en el put.
    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { mensaje: 'No existe un usuario con ese ID' }
            });

        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});

// Exportamos para poderlo utilizar en otros archivos
module.exports = app;