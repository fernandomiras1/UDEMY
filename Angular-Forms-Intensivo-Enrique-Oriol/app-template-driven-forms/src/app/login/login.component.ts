import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(private router:Router, private authService:AuthService) { }
  
  ngOnInit() {
  }

  login(){
    this.authService.login().subscribe(user => {
      if(user != null){
        const destination = this.authService.redirectUrl ? 
        this.router.parseUrl(this.authService.redirectUrl) : '';
        this.router.navigateByUrl(destination);
      }
    })
  }

}
