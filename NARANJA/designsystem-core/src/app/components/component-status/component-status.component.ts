import { Component, Input } from '@angular/core';

export const StatusComponentType = {
  AVAILABLE: 'available',
  BETA: 'beta',
  DEPRECATED: 'deprecated'
};

const StatusTypeStyleMapping = new Map<string, string>();
StatusTypeStyleMapping.set(StatusComponentType.AVAILABLE, 'color--available');
StatusTypeStyleMapping.set(StatusComponentType.BETA, 'color--beta');
StatusTypeStyleMapping.set(StatusComponentType.DEPRECATED, 'color--deprecated');

@Component({
  selector: 'dsn-status',
  templateUrl: './component-status.component.html',
  styleUrls: ['./component-status.component.scss']
})
export class StatusComponent {

  constructor() { }

  text = 'Beta';
  statusClass = StatusTypeStyleMapping.get(StatusComponentType.BETA);

  /**
   * Status type setting (change style))
   */
  @Input()
  set status(status: string) {
    switch (status) {
      case StatusComponentType.AVAILABLE: {
        this.statusClass = StatusTypeStyleMapping.get(StatusComponentType.AVAILABLE);
        this.text = 'Disponible';
        break;
      }
      case StatusComponentType.BETA: {
        this.statusClass = StatusTypeStyleMapping.get(StatusComponentType.BETA);
        this.text = 'Beta';
        break;
      }
      case StatusComponentType.DEPRECATED: {
        this.statusClass = StatusTypeStyleMapping.get(StatusComponentType.DEPRECATED);
        this.text = 'Deprecado';
        break;
      }
      default: {
        this.statusClass = StatusTypeStyleMapping.get(StatusComponentType.BETA);
        this.text = 'Beta';
      }
    }
  }

}
