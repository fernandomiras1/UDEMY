import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circle-avatar',
  templateUrl: './circle-avatar.component.html',
  styleUrls: ['./circle-avatar.component.scss'],
})
export class CircleAvatarComponent {

  constructor() { }

  @Input() backgroundColor: string = 'white';
  @Input() fontSize: number = 2.5;
  @Input() width:    number = 5;
  @Input() height:   number = 5;
  @Input() value:    string = 'FM';

}
