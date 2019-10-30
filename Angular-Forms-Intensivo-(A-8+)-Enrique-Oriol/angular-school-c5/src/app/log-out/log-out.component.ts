import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit() {
  }

  cancel(){
    this.closePopup();
  }

  leave(){
    this.authService.logout();
    this.closePopup('login');
  }  

  closePopup(redirectRoute?){
    if(redirectRoute){
      this.router.navigate([{outlets: {primary:redirectRoute, popup:null}}]);
    }
    else{
      this.router.navigate([{outlets: {popup:null}}]);
    }
  }

}
