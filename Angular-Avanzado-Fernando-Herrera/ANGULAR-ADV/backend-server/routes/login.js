// Requires (Librerias que va a tener el proyecto)
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

var app = express();

//Obtenemos toda la tabla de usuarios
var Usuario = require('../models/usuario');

// Google.
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(config.CLIENT_ID);

var auth = require('../auth/auth');



//=============================================================
// Renueva Token
//=============================================================

app.get('/renuevatoken', auth.verificaToken, (req, res) => {

    var token = jwt.sign({ usuarios: req.usuario }, config.SEED, { expiresIn: 14400 }); // 4 horas

    res.status(200).json({
        ok: true,
        token: token
    });

});


//=============================================================
// Autenticación de Google
//=============================================================
// El async es una prmoesa, espera que resuelva y lo guarda en la contaste ticket
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: config.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    // Aca esta toda la inforamcion del usuario 
    const payload = ticket.getPayload();
    // const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}

//=============================================================
// Autenticación vía google
//=============================================================

app.post('/google', async(req, res) => {

    var token = req.body.token;

    var googleUser = await verify(token)
        .catch(e => {

            return res.status(403).json({
                ok: false,
                mensaje: 'Token de google inválido',
                errors: { message: 'Token de google inválido' }
            });

        });

    Usuario.findOne({ email: googleUser.email }, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (usuario) {
            if (!usuario.google) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Debe usar su autenticación con correo y contraseña'
                });
            } else {
                usuario.password = ':)';

                // Expira en 4 horas (14400 ms)
                var token = jwt.sign({ usuario: usuario }, config.SEED, { expiresIn: 14400 });

                return res.status(200).json({
                    ok: true,
                    id: usuario.id,
                    usuario: usuario,
                    token: token,
                    menu: obtenerMenu(usuario.role)
                });
            }
        } else {
            // El usuario no existe, hay que crearlo
            var nuevoUsuario = new Usuario({
                nombre: googleUser.nombre,
                email: googleUser.email,
                password: ':)',
                img: googleUser.img,
                google: true
            });

            nuevoUsuario.save((err, usuarioGuardado) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear usuario',
                        errors: err
                    });
                }

                // Expira en 4 horas (14400 ms)
                var token = jwt.sign({ usuario: usuarioGuardado }, config.SEED, { expiresIn: 14400 });

                return res.status(200).json({
                    ok: true,
                    id: usuarioGuardado.id,
                    usuario: usuarioGuardado,
                    token: token,
                    menu: obtenerMenu(usuarioGuardado.role)
                });
            });
        }

    });
});



//=============================================================
// Autenticación Normal
//=============================================================

app.post('/', (req, res) => {

    var body = req.body;

    // Verificamos si el usuario con ese correo existe en la db
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });

        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {

            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });

        }

        // Crear un token !!!
        usuarioDB.password = 'null';
        var token = jwt.sign({ usuarios: usuarioDB }, config.SEED, { expiresIn: 14400 }); // 4 horas

        res.status(200).json({
            ok: true,
            usuarios: usuarioDB,
            token: token,
            id: usuarioDB._id,
            menu: obtenerMenu(usuarioDB.role)
        });
    })


});

function obtenerMenu(ROLE) {
    var menu = [{
            titulo: 'Principal',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Dashboard', url: '/dashboard' },
                { titulo: 'ProgressBar', url: '/progress' },
                { titulo: 'Gráficas', url: '/graficas1' },
                { titulo: 'Promesas', url: '/promesas' },
                { titulo: 'Rxjs', url: '/rxjs' }
            ]
        },
        {
            titulo: 'Mantenimiento',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                { titulo: 'Hospitales', url: '/hospitales' },
                { titulo: 'Medicos', url: '/medicos' }
            ]
        }
    ];

    if (ROLE === 'ADMIN_ROLE') {
        // el unshift lo agrega al principio. el push lo agrega al final.
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: '/usuarios' }, )
    }

    return menu;
}

module.exports = app;