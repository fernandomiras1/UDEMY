import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss']
})
export class AvatarSelectorComponent implements OnInit {

  @Output() avatarSel = new EventEmitter<string>();
  @Input() avatarActual = 'av-1.png';

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

  avatarSlide = {
    slidesPerView: 3.5
  };

  constructor() { }

  ngOnInit() {

    this.avatars.forEach( avatar => avatar.seleccionado = false );

    for ( const avatar of this.avatars ) {

      if ( avatar.img === this.avatarActual ) {
        avatar.seleccionado = true;
        break;
      }
    }

  }

  seleccionarAvatar( avatar ) {

    this.avatars.forEach( av => av.seleccionado = false  );
    avatar.seleccionado = true;

    console.log(avatar.img);
    this.avatarSel.emit( avatar.img );

  }

}
