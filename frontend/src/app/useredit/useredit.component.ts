import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import { RegistrationService } from '../registration.service';
import { FormGroup , FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {
  submitted = false;
  editForm!: FormGroup;
  userData!: User[];
  
  constructor(
    public fb:FormBuilder,
    private actRoute:ActivatedRoute,
    private apiService:RegistrationService,
    private router:Router
    
  ) { }

  ngOnInit(): void {
    this.updateUser();
    let id = this.actRoute.snapshot.paramMap.get('userId');
    this.getUser(id);
    this.editForm = this.fb.group({
      userName:['',[Validators.required]],
      email:['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),],],
      phoneNumber:['',[Validators.required,Validators.pattern('[6-9][0-9]{9}')]],
      gender:'',
      dateOfBirth:'',
      password:'',
    })
    
  }
  //getter to access form control
  get myForm(){
    return this.editForm.controls;
  }
  
  getUser(id: any){
    this.apiService.getUserById(id).subscribe((data)=>{
     this.editForm.setValue({
      userName :data['userName'],
      email:data['email'],
      phoneNumber:data['phoneNumber'],
      gender:data['gender'],
      dateOfBirth:data['dateOfBirth'],
      password:data['password']
      }) 
      console.log(data);
    })
  }

  updateUser()
  {
    this.editForm = this.fb.group({

      userName:['',[Validators.required]],
      email:['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),],],
      phoneNumber:['',[Validators.required,Validators.pattern('[6-9][0-9]{9}')]],
      gender:'',
      dateOfBirth:'',
      password:''
    });
  }

  onSubmit(){

      if(window.confirm('Are you sure?')){
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateUser(id, this.editForm.value).subscribe({
          complete:()=>{
            this.router.navigateByUrl('users');
            console.log('content updated!!');

          },
          error:(e)=>{
            console.log(e);
          },
        });
      }
    }
  }