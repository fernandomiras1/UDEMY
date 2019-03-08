import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
// Importamos todo lo que se encuentre dentro de este archivo
import * as socket from '../sockets/socket';

export default class Server {

    private static _intance: Server;

    public app: express.Application;
    public port: number;
    // Propiedad de emitir eventos y escuchar
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
         //Inicializamos
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );

        this.escucharSockets();
       
    }

    // Un mentodo estatico es un metodo que puedo llamar haciendo referencia a la clase 
    public static get instance() {
        // Obtener la intancia de la clase Server, si no exite crea una instancia de la misma. ( this es como si fuera el Server )
        return this._intance || (this._intance = new this() );
    }

    private escucharSockets() {

        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {

            // Conectar cliente
            socket.conectarCliente( cliente );
            
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

    start( callback: Function ) {
        this.httpServer.listen( this.port, callback );
    }
}