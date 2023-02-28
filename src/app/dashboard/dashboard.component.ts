import { Component } from '@angular/core';
import { LoginService } from '../LoginService/login.service';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { filter } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns = ["id", "firstname", "lastname", "email","Action"];
 

  usersData = [
    {
      'id': 1,
      'firstname': "Purushotham",
      'lastname': "siddala",
      'email': "purushotham@gmail.com"
    }, {
      'id': 2,
      'firstname': "Rajesh",
      'lastname': "kumar",
      'email': "rajesh@gmail.com"
    }, {
      'id': 3,
      'firstname': "Hari",
      'lastname': "prasad",
      'email': "hariprasad@gmail.com"
    }, {
      'id': 4,
      'firstname': "Raghu",
      'lastname': "Ram",
      'email': "raghuram@gmail.com"
    },{
      'id': 5,
      'firstname': "Govardan",
      'lastname': "K",
      'email': "raghuram@gmail.com"
    }
  ]


  ngOnInit(){
    sessionStorage.setItem("sessiondata",JSON.stringify(this.usersData))
    const sessiondata = sessionStorage.getItem("sessiondata");
    this.usersData = JSON.parse(sessiondata || '{}');

  }
  

 
  

  constructor(private loginsvr: LoginService,private dialog:MatDialog) { }

  openDialog():void {
   let dialogRef = this.dialog.open(DialogComponent, {
      width:'30%'
    });

    dialogRef.afterClosed().subscribe(create=>{
      var getnewdata ={
        id: this.usersData.length + 1,
        firstname: create.data.firstname.value,
        lastname:create.data.lastname.value,
        email:create.data.email.value
      }
      this.usersData=[...this.usersData,getnewdata];
      sessionStorage.setItem("sessiondata",JSON.stringify(this.usersData));
    })
  
  }



  logoutpage() {
    this.loginsvr.logoutuser();
  }
  edituserdata(edit:any):void{
    console.log(edit);
    //sending data from dashboard to dialog box
    let dialogRef = this.dialog.open(DialogComponent, {
      width:'30%',
      data:{
        id:edit.id,
        firstname:edit.firstname,
        lastname:edit.lastname,
        email:edit.email
      }
     
    });
    //getting modified data from dialog box 
    dialogRef.afterClosed().subscribe(edited=>{
      console.log(edited);
      var tempvariable ={
        id: edited.data.id.value,
        firstname: edited.data.firstname.value,
        lastname:edited.data.lastname.value,
        email:edited.data.email.value
      }
      
      //finding the index and assining data to it.
      const testing = [...this.usersData,tempvariable];
      const index = testing.findIndex((x) => x.id ===tempvariable.id);
      (testing[index].firstname = tempvariable.firstname);
      (testing[index].lastname = tempvariable.lastname);
      (testing[index].email = tempvariable.email); 
    });
    }

    //deleting the item
    deleteitem(num:any):void{
      const index = this.usersData.findIndex((x) => x.id ===num.id);
      this.usersData.splice(index,1);
      this.usersData = [...this.usersData];
      sessionStorage.setItem("sessiondata",JSON.stringify(this.usersData));
    }

 






    
  }



