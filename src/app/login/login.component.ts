import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_Services/user-auth.service';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private userService : UserService, 
    private userauthservice : UserAuthService,
    private roter : Router) { }

  ngOnInit(): void {
  }

  login(loginForm: NgForm){
    this.userService.Login(loginForm.value)
      .subscribe(
        (response : any) => {
          this.userauthservice.setRoles(response.user.role);
          this.userauthservice.setToken(response.jwtToken);
          const role = response.user.role[0].rolename;
          // console.log(response);
          if(role === 'Admin'){
            this.roter.navigate(['/Admin']);
          }else{
            this.roter.navigate(['/User']);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
