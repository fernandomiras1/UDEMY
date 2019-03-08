"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuarios_lista_1 = require("../class/usuarios-lista");
const usuario_1 = require("../class/usuario");
const router_1 = require("../routes/router");
// Creamos una unica Intancia de mis usuarios conectados, es esta forma podemos acceder a todos sus metodos.
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
// Creamos la configuracion y las acciones de cada una de las acciones que van  a ser disparadas desde el  io.on ( emiciones )
// MAPAS
exports.marcadorNuevo = (cliente) => {
    cliente.on('marcador-nuevo', (marcador) => {
        router_1.mapa.agregarMarcador(marcador);
        // io.emit( 'marcador-nuevo', marcador );
        // broadcast: emite a todo el mundo, menos al mismo clinete.
        cliente.broadcast.emit('marcador-nuevo', marcador);
    });
};
exports.marcadorBorrar = (cliente) => {
    cliente.on('marcador-borrar', (id) => {
        router_1.mapa.borrarMarcador(id);
        cliente.broadcast.emit('marcador-borrar', id);
    });
};
exports.marcadorMover = (cliente) => {
    cliente.on('marcador-mover', (marcador) => {
        router_1.mapa.moverMarcador(marcador);
        cliente.broadcast.emit('marcador-mover', marcador);
    });
};
// FIN MAPAS
exports.conectarCliente = (cliente) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        exports.usuariosConectados.borrarUsuario(cliente.id);
        // Emito a todo el mundo, la lista de los usuarios que actualmente quedan activos
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
// Escuchar Mensajes
exports.mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje Recibido', payload);
        // Estoy emitiendo a todos los usuarios conetados que hay un nuevo mensaje
        io.emit('mensaje-nuevo', payload);
    });
};
// Configurar Usuario
exports.configurarUsuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        // Emito a todo el mundo, la lista de los usuarios que actualmente quedan activos
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
};
// Obtener Usuarios
exports.obtenerUsuarios = (cliente, io) => {
    cliente.on('obtener-usuarios', () => {
        // Emito a todo el mundo, la lista de los usuarios que actualmente quedan activos
        // con el to , se lo mandamos a un cliente en particular( a la persona que esta conectada )
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
