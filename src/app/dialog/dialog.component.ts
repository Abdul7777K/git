import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog'


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{

form:any=FormGroup;


constructor(
  private fb:FormBuilder,
  private rtr:Router,
  public dialogRef:MatDialogRef<DialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any=[]){}

 

ngOnInit(){
  this.dialogformBuild()
}
onCancel():void{
  this.dialogRef.close();
}

dialogformBuild(){
  this.form = this.fb.group({
    id:'',
    firstname: ['',Validators.required],
    lastname: ['',Validators.required],
    email:['',[Validators.required, Validators.email]]
  })
  this.form.patchValue(this.data);
  console.log(this.data);
}

returntodb(){
  this.rtr.navigate(['/dashboard']);
}


submit(){
  this.dialogRef.close({
    data:{
      id:this.form.get('id'),
      firstname:this.form.get('firstname'),
      lastname:this.form.get('lastname'),
      email:this.form.get('email')
    }
  })
   
  }


}






