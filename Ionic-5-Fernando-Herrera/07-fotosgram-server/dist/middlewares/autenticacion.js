"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaToken = void 0;
const token_1 = __importDefault(require("../classes/token"));
exports.verificaToken = (req, res, next) => {
    const userToken = req.get('x-token') || '';
    token_1.default.comprobarToken(userToken)
        .then((decoded) => {
        console.log('Decoded', decoded);
        // le agregamos la info del usuario.
        req.usuario = decoded.usuario;
        next(); // mi token es correcro. llamaos puede continucar con el siguiente paso.
    })
        .catch(err => {
        res.json({
            ok: false,
            mensaje: 'Token no es correcto'
        });
    });
};
