import { Component, ContentChild, TemplateRef, Input } from '@angular/core';

@Component({
  selector: 'dsn-tab',
  template: ''
})
export class TabComponent {
  @Input() title: string;
  @Input() template: TemplateRef<any>;
}
