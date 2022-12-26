import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_Services/user-auth.service';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userauthservice: UserAuthService,
    private router: Router,
    public userService : UserService) { }

  ngOnInit(): void {
  }
  public IsLoggedIn() {
    return this.userauthservice.IsLoggedIn();
  }

  public logout() {
    this.userauthservice.clear();
    this.router.navigate(["/"]);
  }

  public isAdmin(){
    return this.userauthservice.IsAdmin();
  }

  public isUser(){
    return this.userauthservice.IsUser();
  }
}
