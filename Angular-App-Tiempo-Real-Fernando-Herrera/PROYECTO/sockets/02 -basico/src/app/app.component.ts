import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public wsService: WebsocketService,
              public chatService: ChatService) {}

  ngOnInit() {
    // Me voy a subribir a a la escucha del metodo privado.
    // Va a estar ecuchando el metodo cuando salga una peticion
    this.chatService.getMessagesPrivate().subscribe( msg => {
      // Cuando resivamos un mensaje privado, se va a emitir este metodo
        console.log(msg);
    });

  }

}
