var jwt = require('jsonwebtoken');
var config = require('../config/config');


//=============================================================
// Verificar token - Lo va hacer con los metodos (put, post y delete)
//=============================================================

exports.verificaToken = function(req, res, next) {

    var token = req.query.token;

    jwt.verify(token, config.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }


        // Obtenemos la informacion del usuaio.
        req.usuarios = decoded.usuarios;

        // Le agregamos el next para que continue con las peticiones de mas abajo, que seria el put, post y delete. 
        next();
    });

}


//=============================================================
// Verificar ADMIN ( No se usa actualemte )
//=============================================================

exports.verificaADMIN_ROLE = function(req, res, next) {

    var role = req.body.role;
    if (role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(403).json({
            ok: false,
            mensaje: 'Token incorrecto - No es Administrador',
            errors: { message: 'No es administrador' }
        });
    }

}

//=============================================================
// Verificar ADMIN o Mismo Usuario
//=============================================================

exports.verificaADMIN_ROLE_o_MismoUsuario = function(req, res, next) {

    var body = req.body;
    var id = req.params.id;
    if (body.role === 'ADMIN_ROLE' || body._id === id) {
        next();
    } else {
        return res.status(403).json({
            ok: false,
            mensaje: 'Token incorrecto - No es Administrador ni es el mismo usuario',
            errors: { message: 'No es administrador' }
        });
    }

}