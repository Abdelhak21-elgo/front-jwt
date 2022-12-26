import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: []) {
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles')!);
  }

  public setToken(jwtToken : string){
    localStorage.setItem("jwtToken", jwtToken);
  }

  public getToken() : string{
    return localStorage.getItem("jwtToken")!;
  }

  public clear(){
    localStorage.clear();
  }

  public IsLoggedIn(){
    return this.getRoles() && this.getToken();
  }

  public IsAdmin(){
    const rolees : any[] = this.getRoles();
    return rolees[0].rolename === 'Admin';
  }

  public IsUser(){
    const rolees : any[] = this.getRoles();
    return rolees[0].rolename === 'User';
  }
}
