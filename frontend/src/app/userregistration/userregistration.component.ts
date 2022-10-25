import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import {RegistrationService} from '../registration.service';
import {User} from '../models/user';

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserregistrationComponent implements OnInit {

  formSubmitted = false;
  formNotSubmitted = false;
  addUserForm!:FormGroup;
  userData: User[]=[];
  userName!:FormControl;
  email! :FormControl ;
  phoneNumber!:FormControl;
  gender!:FormControl;
  dateOfBirth!:FormControl;
  password!:FormControl;
  
  
  
  constructor(
    private acRoute:ActivatedRoute,
    private regService:RegistrationService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.userName=new FormControl('',[Validators.minLength(3),Validators.required]);
    this.email=new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9]+[@][a-zA-Z]+[.][a-zA-Z]+')]);
    this.phoneNumber=new FormControl('',[Validators.required,Validators.pattern('[6-9][0-9]{9}')]);
    this.gender=new FormControl();
    this.dateOfBirth=new FormControl();
    this.password=new FormControl('',[Validators.required,Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])[a-zA-Z0-9@#$%^&*-+=!()]{8,20}')]);
   
    

    this.addUserForm=new FormGroup({
      'userName' :this.userName,
      'email':this.email,
      'phoneNumber':this.phoneNumber,
      'gender':this.gender,
      'dateOfBirth':this.dateOfBirth,
      'password':this.password
      
      
    });
  }
  
  addUser(){
    console.log("add user...");
    this.formSubmitted = true;
    if(window.confirm("are you sure???")){
      this.regService.addUser(this.addUserForm.value).subscribe({
        complete :()=>{
          this.router.navigateByUrl('/users/authenticate');
          console.log('user added successfully')
        },
        error : (e :any) =>{
          console.log(e)
          this.formNotSubmitted = true;
        }
      });
    }
}

}
