import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../LoginService/login.service';




@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {
  
  loginVsSign = true;
  loginForm:any= FormGroup;
  UserName = "John@gmail.com";
  Password = "Test123456";

  private formSubmitAttempt:boolean | undefined;
 
  constructor(
    private fb: FormBuilder,private router:Router,private srvc:LoginService
  ) { }

  ngOnInit(): void {
    this.loginFormBuild();
  }

  loginFormBuild() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  submit() {
 
    // console.log(this.loginForm.get('username').value);
    // console.log(this.loginForm.get('password').value);
    if(this.loginForm.valid){
      var res =  this.srvc.validateUser(this.loginForm.get('username').value,this.loginForm.get('password').value)
    if(res){
      localStorage.setItem("username",this.loginForm.get('username').value);
      localStorage.setItem("password",this.loginForm.get('password').value);
      this.router.navigate(['homepage']);
    }else{
      alert("Invalid User");
    }
    }
    this.formSubmitAttempt = true;
    
  }
  
  signup(){
    this.loginVsSign = true;
  }
  gotologinpage(){
    this.loginVsSign = false;
  }

}
