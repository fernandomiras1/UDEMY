import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { BotService } from '@app/services/bot/bot.service';
import { SessionManagerService } from "../../services/session-manager.service";
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatbotComponent implements OnInit {

  open:boolean = false;

  messages: any[] = [];

  userId:string;

  @ViewChild('messageBody') messageBody:ElementRef

  constructor(private botService:BotService) {}

  ngOnInit(): void {
    
    let message = `
    Hola! Soy el Bot de la dirección de Operaciones. 
    Trataremos de responderte tus consultas. 
    Enviá 'AYUDA' para más detalles o <br> 'QUE TE PUEDO CONSULTAR' <br>
    para ver ejemplos de las consultas que manejo actualmente...`;

    this.messages.push({side:'receiver', content:message});

    this.userId = SessionManagerService.user().id_usuario;

  }

  sendMessage(input:any): void {
    if(input.value.length > 0) {
        this.messages.push({side:'sender', content:input.value});
        this.keepScrollBottom()
        this.botService.chat(this.userId,input.value).then((response:any) => {
          this.messages.push({side:'receiver', content: decodeURIComponent(response)});
          this.keepScrollBottom();
        });
        input.value = null;
    }
  }

  keepScrollBottom() {
    setTimeout(() => {
      let messageBody = this.messageBody.nativeElement;
      messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    })
  }

}
