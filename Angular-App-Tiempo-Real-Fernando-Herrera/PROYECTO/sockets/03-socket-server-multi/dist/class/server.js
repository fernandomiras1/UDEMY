"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environment_1 = require("../global/environment");
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
// Importamos todo lo que se encuentre dentro de este archivo
const socket = __importStar(require("../sockets/socket"));
class Server {
    constructor() {
        //Inicializamos
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        this.escucharSockets();
    }
    // Un mentodo estatico es un metodo que puedo llamar haciendo referencia a la clase 
    static get instance() {
        // Obtener la intancia de la clase Server, si no exite crea una instancia de la misma. ( this es como si fuera el Server )
        return this._intance || (this._intance = new this());
    }
    escucharSockets() {
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente => {
            // MAPAS
            socket.marcadorNuevo(cliente);
            socket.marcadorBorrar(cliente);
            socket.marcadorMover(cliente);
            // FIN DE MAPAS
            // Conectar cliente
            socket.conectarCliente(cliente);
            // Configurar Usuario
            socket.configurarUsuario(cliente, this.io);
            // Desconectar
            socket.desconectar(cliente, this.io);
            //Mensajes ( que este pendiente de esecuchar los mensajes)
            socket.mensaje(cliente, this.io);
            //Obtener usuarios Actibos
            socket.obtenerUsuarios(cliente, this.io);
        });
    }
    start(callback) {
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = Server;
