"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    // Agregar un Usuario
    agregar(usuario) {
        this.lista.push(usuario);
        return usuario;
    }
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('-----Actualizar Usuario ------');
        console.log(this.lista);
    }
    // Obtener lista de usuarios
    getLista() {
        return this.lista.filter(user => user.nombre !== 'sin-nombre');
    }
    getUsuario(id) {
        return this.lista.find(user => user.id === id);
    }
    // Obtener usuario en una sala en particular
    getUsuarioEnSala(sala) {
        return this.lista.filter(user => user.sala === sala);
    }
    // Borrar un usuario
    borrarUsuario(id) {
        const temUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(user => user.id != id);
        console.log('-----Cliente desconectado ------');
        console.log(this.lista);
        return temUsuario;
    }
}
exports.UsuariosLista = UsuariosLista;
