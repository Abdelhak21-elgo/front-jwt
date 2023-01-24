import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_Services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  

  constructor(private userService : UserService,
    private router : Router) { }

  ngOnInit(): void {
  }

  register(registerForm : NgForm){
    this.userService.registerNewUser(registerForm.value).subscribe(
      (response) => {
        this.router.navigate(["/Login"]);
        // registerForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
