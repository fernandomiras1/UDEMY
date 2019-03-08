import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  messageSubscription: Subscription;
  elemento: HTMLElement;
  mensajes = [];

  constructor( public chatService: ChatService) { }

  ngOnInit() {

    this.elemento = document.getElementById('chat-mensajes');

    // Me subcribo a todos los mensajes emitido de cualquier cliente
   this.messageSubscription = this.chatService.getMessages().subscribe( msg => {

      this.mensajes.push(msg);

      // Lo que hacemos aca es que el scrooll se valla al ultimo de la lista. Para que visualize el ultimo mensaje
      setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }

  enviar() {

    // Si no tiene nada que no valla al servidor
    if ( this.texto.trim().length === 0 ) {
      return;
    }

    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
}
