import { Injectable } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) { }

  sendMessage( mesnaje: string ) {

    const payload = {
      de: this.wsService.getUsuario().nombre,
      cuerpo: mesnaje
    };

    this.wsService.emit('mensaje', payload);
  }
  // esto devuelve un observable que esta escuchando cualquier emision con ese nobmre ( mensaje-nuevo)
  getMessages() {
    return this.wsService.listen('mensaje-nuevo');
  }

  // Mensajes Privados
  getMessagesPrivate() {
    return this.wsService.listen('mensaje-privado');
  }

  getUsuariosActivos() {
    return this.wsService.listen('usuarios-activos');
  }


  emitirUsuariosActivos() {
   this.wsService.emit('obtener-usuarios');
  }
}
