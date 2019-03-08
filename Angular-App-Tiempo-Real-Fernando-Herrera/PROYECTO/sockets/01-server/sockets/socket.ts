import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../class/usuarios-lista';
import { Usuario } from '../class/usuario';

// Creamos una unica Intancia de mis usuarios conectados, es esta forma podemos acceder a todos sus metodos.
export const usuariosConectados = new UsuariosLista();
// Creamos la configuracion y las acciones de cada una de las acciones que van  a ser disparadas desde el  io.on ( emiciones )


export const conectarCliente = (cliente: Socket) => {

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar(usuario);
}


export const desconectar = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');  
        usuariosConectados.borrarUsuario(cliente.id);

        // Emito a todo el mundo, la lista de los usuarios que actualmente quedan activos
        io.emit('usuarios-activos', usuariosConectados.getLista());

        
    });
    
}


// Escuchar Mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('mensaje', (payload: {de: string, cuerpo: string }) => {
        console.log('Mensaje Recibido', payload);
        // Estoy emitiendo a todos los usuarios conetados que hay un nuevo mensaje
        io.emit('mensaje-nuevo', payload);
    });
}



// Configurar Usuario
export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('configurar-usuario', (payload: {nombre: string }, callback: Function) => {
      
        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );
          // Emito a todo el mundo, la lista de los usuarios que actualmente quedan activos
        io.emit('usuarios-activos', usuariosConectados.getLista());

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });
    });
}

// Obtener Usuarios
export const obtenerUsuarios = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('obtener-usuarios', () => {
      
          // Emito a todo el mundo, la lista de los usuarios que actualmente quedan activos
          // con el to , se lo mandamos a un cliente en particular( a la persona que esta conectada )
        io.to( cliente.id ).emit('usuarios-activos', usuariosConectados.getLista());

    });
}
