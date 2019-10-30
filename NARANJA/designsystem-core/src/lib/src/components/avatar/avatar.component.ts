import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IAvatar } from './avatar.interface';

export const SizeAvatar = {
  EXTRALARGE: 'extra-large',
  LARGE: 'large',
  MEDIUM: 'medium',
  SMALL: 'small',
  VERYSMALL: 'very-small'
};

export const RandomColors = [
  { hex: '#F96D6D', id: 1, name: 'illustrations-red' },
  { hex: '#FECF65', id: 2, name: 'illustrations-yellow' },
  { hex: '#53B5FD', id: 3, name: 'illustrations-sky-blue' },
  { hex: '#5063FB', id: 4, name: 'illustrations-blue' },
  { hex: '#9A51E5', id: 5, name: 'illustrations-violet' },
  { hex: '#63DBAA', id: 6, name: 'illustrations-green' },
  { hex: '#B6C4CF', id: 7, name: 'illustrations-steel' },
  { hex: '#333B73', id: 8, name: 'illustrations-night-blue' },
  { hex: '#DDDDDD', id: 9, name: 'color-grayscale-300' }
];

@Component({
  selector: 'z-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class NGZAvatarComponent implements OnInit, IAvatar {

  @Input() set size(size: string) {
    switch (size) {
      case SizeAvatar.EXTRALARGE: {
        this.sizeAvatar = 'extra-large';
        this.sizeIcon = 'size-32';
        this.fontSize = '40px';
        break;
      }
      case SizeAvatar.LARGE: {
        this.sizeAvatar = 'large';
        this.sizeIcon = 'size-24';
        this.fontSize = '30px';
        break;
      }
      case SizeAvatar.MEDIUM: {
        this.sizeAvatar = 'medium';
        this.sizeIcon = 'size-16';
        this.fontSize = '20px';
        break;
      }
      case SizeAvatar.SMALL: {
        this.sizeAvatar = 'small';
        this.sizeIcon = 'size-12';
        this.fontSize = '16px';
        break;
      }
      default: {
        this.sizeAvatar = 'extra-large';
        this.sizeIcon = 'size-32';
        this.fontSize = '40px';
        break;
      }
    }
  }

  @Input() iconName = 'icon-user';
  @Input() initials: string;
  @Input() urlImg: string;

  @Output() clickCard = new EventEmitter();

  public sizeAvatar = 'extra-large';
  public sizeIcon = 'size-32';
  public fontSize: string;
  public onlyIcon: string;
  public color: any;
  public nameIcon = 'icon-user';
  public backgroundColor = RandomColors[8].hex;

  ngOnInit() {
    const randomIndex = Math.floor(Math.random() * (RandomColors.length - 3));
    if (this.initials) {
      this.backgroundColor = RandomColors[randomIndex].hex;
    }
  }
}
