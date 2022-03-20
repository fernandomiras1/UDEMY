import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-web-page',
  templateUrl: './whatsapp-web-page.component.html',
  styleUrls: ['./whatsapp-web-page.component.scss'],
})
export class WhatsappWebPageComponent {
  readonly chatList = [
    {
      name: 'Fernando Miras',
      details:
        'Hola todo bien, esto es un clone de WahatsApp Web. Todo con HTML 5',
      time: '10:56',
      active: true,
    },
    {
      name: 'Federico Miras',
      details: 'Hi, how are you',
      time: '15:16',
      unread: 1,
    },
    {
      name: 'Brunejo',
      details: 'Hi, how are you',
      time: '15:16',
    },
    {
      name: 'Viva el Bullying',
      details: 'A donde saliste vos?',
      time: '11:16',
    },
    {
      name: 'Otro grupo para silenciar',
      details: 'Tengo que mejorar mi speech',
      time: '11:13',
    },
    {
      name: 'Rodrigo viadels',
      details: 'Tas muy inactivo. Donde esta el fer partuzero?? Jaj',
      time: '12:12',
    },
    {
      name: 'Comseg devs',
      details: 'Descripción de mí semana 😃',
      time: '12:12',
    },
    {
      name: 'Franco Primo',
      details:
        'Hice un par de compras y comí con el Fede afuera y se me fueron 8k bajo las patas en 2hs',
      time: '3:52',
    },
    {
      name: 'Martin Raffa',
      details: 'Son re buenas noticias',
      time: '09:52',
    },
  ];
}
