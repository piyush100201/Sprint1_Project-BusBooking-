import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { RegistrationService } from '../registration.service';
import { User } from '../models/user';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  Credentials:any;
  Users:any = [];
  submitted = false;
  notSubmitted = false;
  loginForm!: FormGroup; //this represents whole form
  email!: FormControl;
  password!: FormControl;

  constructor(public authService: AuthServiceService, private regService:RegistrationService, public router: Router) {}

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);

    this.loginForm = new FormGroup({
      'email': this.email,
      'password': this.password
    })
  }
  readUser(){
    this.regService.getUsers().subscribe((data)=>{
      this.Users = data;
    })
  }
  loginUser() {
    // this.Credentials=this.loginForm.value
    // if(this.Users.includes(this.Credentials.email))
    this.authService.login(this.loginForm.value)}
    // else{
    //  alert("User doesn't exists");

    // }
  // }
  }




  
  
 
      
