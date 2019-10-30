import { Component, Input } from '@angular/core';

export const LoadingType = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary'
};

export const LoadingTypeStyleMapping = new Map<string, string>();
LoadingTypeStyleMapping.set(LoadingType.PRIMARY, 'z-primary');
LoadingTypeStyleMapping.set(LoadingType.SECONDARY, 'z-secondary');

@Component({
  selector: 'z-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class NGZLoadingComponent {
  @Input() size = 'medium';
  @Input()
  set type(type: string) {
    this.typeLoadingClass = LoadingTypeStyleMapping.get(type) || LoadingTypeStyleMapping.get('primary');
  }
  typeLoadingClass = LoadingTypeStyleMapping.get('primary');
  @Input() withBg = false;
}
