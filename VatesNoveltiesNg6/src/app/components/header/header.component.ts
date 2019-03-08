import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, IAuthentication } from '../../services/auth/auth.service';
import { ApplicationService } from '../../services/application/application.service';
import { ModeEnum } from '../../../environments/environment';
import { ProgressBarService } from '../../services/application/progress-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string;
  userFullName: string;
  thathola: Boolean = false;
  progressBarMode: string;
  public authenticationData: IAuthentication;
  constructor(private route: Router,
              public authService: AuthService,
              private progressBarService: ProgressBarService,
              public appService: ApplicationService) {
              this.authenticationData = AuthService.authData;
  }

  newItem() {}
  ngOnInit() {
    this.userName = this.authService.getUserName();
    this.userFullName = this.authService.getUserFullName();
    this.progressBarService.updateProgressBar$.subscribe(async (mode: any) => {
      if (mode) {
        this.progressBarMode = await mode;
      }
    });
}

  onLogout() {
    return this.authService.onLogout();
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  btnNovelties() {
    this.route.navigate(['/novelties']);
    this.appService.currentStatus = ModeEnum.Search;
  }

  btnCruisingSalary() {
    this.route.navigate(['/cruising-salary']);
    this.appService.currentStatus = ModeEnum.Search;
  }

  btnLiquidate() {
    this.route.navigate(['/liquidate']);
    this.appService.currentStatus = ModeEnum.Search;
  }

}
