import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private rtr:Router) { }

credentials = {
  Uname:"John@gmail.com",
  Upassword:"Test12345"
}
  validateUser(username:string,password:string){
    if(this.credentials.Uname===username && this.credentials.Upassword === password){
      return true;
    }else{
      return false;
    }
    
  }

  logoutuser(){
    localStorage.clear();
    this.rtr.navigate(['']);
  }
}
