import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // apipath = environment.apipathback;
  apipath = "http://localhost:8080";

  requestHeader = new HttpHeaders({
    "No-Auth": "True"
  });
  constructor(private httpclient: HttpClient,
    private userauthservice: UserAuthService) { }

  public Login(loginData: any) {
    return this.httpclient.post(this.apipath + "/authenticate", loginData
      , { headers: this.requestHeader });
  }

  public registerNewUser(registerForm: any) {
    return this.httpclient.post(this.apipath + "/regestNewUser", registerForm);
  }

  public forUser() {
    return this.httpclient.get(this.apipath + '/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.apipath + '/forAdmin', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles: any[]): boolean | any {
    let isMatch = false;
    const userRoles: any = this.userauthservice.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].rolename === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }


}
