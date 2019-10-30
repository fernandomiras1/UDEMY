import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IAvatarPill } from './avatar-pill.interface';

@Component({
  selector: 'z-avatar-pill',
  templateUrl: './avatar-pill.component.html',
  styleUrls: ['./avatar-pill.component.scss']
})
export class NGZAvatarPillComponent implements OnInit, IAvatarPill {

  @Input() name: string;

  @Output() clickPill = new EventEmitter();
  public fontSize: string;

  ngOnInit() {
  }
}
