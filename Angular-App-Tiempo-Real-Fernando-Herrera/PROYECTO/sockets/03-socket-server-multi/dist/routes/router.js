"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../class/server"));
const socket_1 = require("../sockets/socket");
const grafica_1 = require("../class/grafica");
const encuesta_1 = require("../class/encuesta");
const mapa_1 = require("../class/mapa");
const router = express_1.Router();
// MAPAS 
exports.mapa = new mapa_1.Mapa();
const lugares = [
    {
        id: '1',
        nombre: 'Udemy',
        lat: 37.784679,
        lng: -122.395936
    },
    {
        id: '2',
        nombre: 'Bahía de San Francisco',
        lat: 37.798933,
        lng: -122.377732
    },
    {
        id: '3',
        nombre: 'The Palace Hotel',
        lat: 37.788578,
        lng: -122.401745
    }
];
// Lo inicerta como elementos independientes
exports.mapa.marcadores.push(...lugares);
// Get Obtener todos los marcadores
router.get('/mapa', (req, res) => {
    res.json(exports.mapa.getMarcadores());
});
// FIN MAPAS
// Creamos una instancia para poder trabajar con los metodos de la grafica
const grafia = new grafica_1.GraficaData();
const encueta = new encuesta_1.EncuestaData();
router.get('/grafica', (req, res) => {
    res.json(grafia.getDataGrafica());
});
// router.post('/grafica', ( req: Request, res: Response ) => {
//     const mes = req.body.mes;
//     const unidades = Number(req.body.unidades);
//     console.log('mes', mes + 'uni', unidades);
//     grafia.incrementarValor( mes, unidades );
//     const server = Server.instance;
//     server.io.emit('cambio-grafica', grafia.getDataGrafica() ) 
//     res.json( grafia.getDataGrafica() );
// });
router.post('/encuesta', (req, res) => {
    const opcion = Number(req.body.opcion);
    const unidades = Number(req.body.unidades);
    encueta.incrementarValor(opcion, unidades);
    const server = server_1.default.instance;
    server.io.emit('cambio-encuenta', encueta.getDataGrafica());
    res.json(encueta.getDataGrafica());
});
// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', (req, res) => {
    const server = server_1.default.instance;
    server.io.clients((err, clientes) => {
        if (err) {
            return res.json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            clientes
        });
    });
});
// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req, res) => {
    res.json({
        ok: true,
        clientes: socket_1.usuariosConectados.getLista()
    });
});
exports.default = router;
