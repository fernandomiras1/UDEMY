import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { AngularLoadListService } from '../../services/load-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dsn-load-list',
  templateUrl: './load-list.component.html',
  styleUrls: ['./load-list.component.scss']
})
export class LoadListComponent implements OnInit, AfterContentChecked {
  links: any;
  route: string;
  @Input() isMenu = false;

  constructor(
    private loadList: AngularLoadListService,
    private router: Router
  ) { }

  ngOnInit() {
    this.links = this.loadList.getList();
  }

  onMenuItemSelected(itemId: string, route = null) {
    if (route) {
      this.router.navigate(['/', route]);
      return;
    }
    this.router.navigate(['/angular', itemId]);
  }

  ngAfterContentChecked(): void {
    this.route = this.router.url;
  }
}
