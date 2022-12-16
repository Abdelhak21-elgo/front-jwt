import { Component, OnInit } from '@angular/core';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  message: any;
  constructor(private userSercie : UserService) { }

  ngOnInit(): void {
    this.forUser();
  }

  forUser(){
    this.userSercie.forUser().subscribe(
      (response) => {
        console.log(response);
        this.message = response;
      },
      (error) => {
        console.log(error);
      }
      );
  }
}
