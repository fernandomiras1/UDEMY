import { Usuario } from './usuario';

export class UsuariosLista {
    private lista: Usuario[] = [];

    constructor() {}

    // Agregar un Usuario
    public agregar( usuario: Usuario) {
        this.lista.push(usuario);

        return usuario;
    }


    public actualizarNombre( id: string, nombre: string ) {

        for( let usuario of this.lista ) {

            if ( usuario.id === id ) {
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('-----Actualizar Usuario ------');
        console.log(this.lista);

    }

    // Obtener lista de usuarios
    public getLista() {
        return this.lista.filter(user => user.nombre !== 'sin-nombre');
    }

    public getUsuario( id: string ) {
        return this.lista.find(user => user.id === id);
    }

    // Obtener usuario en una sala en particular
    public getUsuarioEnSala(sala: string) {
        return this.lista.filter(user => user.sala === sala);
    }

    // Borrar un usuario
    public borrarUsuario(id: string) {
        const temUsuario = this.getUsuario(id);

        this.lista = this.lista.filter(user => user.id != id);

        console.log('-----Cliente desconectado ------');
        console.log(this.lista);

        return temUsuario;
    }
}