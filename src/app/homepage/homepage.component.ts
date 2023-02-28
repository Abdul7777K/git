import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../LoginService/login.service';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  constructor(private serviece:LoginService,private rtr:Router){}

  logoutpage(){
    this.serviece.logoutuser();
  }
  gotodashboard(){
    this.rtr.navigate(['dashboard']);
  }
}
