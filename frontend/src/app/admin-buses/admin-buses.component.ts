// Decorators and Lifehooks
import { Component, OnInit } from '@angular/core';




// Forms
import { FormControl, FormGroup, Validators, AbstractControl,FormBuilder } from '@angular/forms';

// Router
import { Router } from '@angular/router';

// Services

import { BusService } from 'src/app/service/bus.service'; 

// Custom Validators

// import { isUrlValidator } from '../../core/directives/is-url.directive';
// import { isIsbnValidator } from '../../core/directives/is-isbn.directive';
import { Bus } from '../models/bus.model';
import { User } from '../models/user';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-admin-buses',
  templateUrl: './admin-buses.component.html',
  styleUrls: ['./admin-buses.component.css']
})
export class AdminBusesComponent implements OnInit {
  isSubmitted = false;
  date:String;
  formSubmitted = false;
  formNotSubmitted = true;
  createBusForm!: FormGroup;
  busDataArray : Bus[] = [];
  submitted = false;
  busForm! : FormGroup;
  busArray : Bus[]  = [];
  Types: any = ['Sleeper','Semi-sleeper'];
  Cities: any = ['Delhi','Bombay','Kolkata','Mumbai'];

  busNumber! : FormControl;
  companyName!:  FormControl;
  busType!:  FormControl;
  startCity!:  FormControl;
  destination!:  FormControl;
  departTime! : FormControl;
  departDate!:  FormControl;
  pricePerSeat!:  FormControl;
  seatsRow!:  FormControl;
  seatsCol!:  FormControl;
  driverName!:  FormControl;
  driverNumber!:  FormControl;
  
  user : User;

  constructor(
    private router: Router,
    private busService: BusService,
    private userService:RegistrationService,
  ) {
  
   }
  //  this.User = new User();
    
  //  this.userService.getUserById(this.id).subscribe((data) => {
  //    this.User = data;
     
  //    console.log(data);
  //  })

   ngOnInit(): void {

    if(!localStorage.getItem("userId")){
      this.router.navigateByUrl('/');
    }
    else{
      var x = localStorage.getItem("userId");
      this.userService.getUserById(x).subscribe((data) => {
           this.user = data;
           
           if(this.user.role =='Customer'){
              this.router.navigateByUrl('/');
           }
         })
    }
    
    this.busNumber=new FormControl('', [Validators.pattern('^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$'), Validators.required]);
    this.companyName=new FormControl('',[Validators.minLength(3),Validators.required]);
    this.busType=new FormControl('',[Validators.required]) ;
    this.startCity=new FormControl('',[Validators.required]);
    this.destination=new FormControl('',[Validators.required]);
    this.departDate=new FormControl('',[Validators.required]);
    this.departTime=new FormControl('',[Validators.required]);
    this.pricePerSeat=new FormControl('',[Validators.required,Validators.pattern('[1-9][0-9]{2,3}')]);
    this.seatsRow=new FormControl('',[Validators.pattern('^[1-9]{1,1}$'), Validators.required]);
 
    this.seatsCol=new FormControl('',[Validators.pattern('^[1-9]{1,1}$'), Validators.required]);
    this.driverName=new FormControl('',[Validators.required]);
    this.driverNumber=new FormControl('',[Validators.required,Validators.pattern('[6-9][0-9]{9}')]);
    
    this.createBusForm = new FormGroup({
     'busNumber' : this.busNumber,
     'companyName' : this.companyName,
     'busType' : this.busType,
     'startCity' : this.startCity,
     'destination' : this.destination,
     'departDate' : this.departDate,
     'departTime' : this.departTime,
     'pricePerSeat' : this.pricePerSeat,
     'seatsRow' : this.seatsRow,
     'seatsCol' : this.seatsCol,
     'driverName' : this.driverName,
     'driverNumber' : this.driverNumber
    })


  
    this.busService
    .getAllBus()
    .subscribe((res)=>{
      this.busDataArray = res;
      console.log(res);
      
    })
     this.busService.getAllBus().subscribe(()=>{
         console.log(1);
         
     })

  }

  
  createBus(){
    // console.log(this.createBusForm.value);
    this.formSubmitted = true;
    this.formNotSubmitted = false;
    this.isSubmitted = true;
    if(window.confirm("are you sure???")){
      console.log(this.createBusForm.value);
      
      this.busService.createBus(this.createBusForm.value).subscribe({
        complete :()=>{
          // this.router.navigateByUrl('/users/authenticate');
          // console.log('user added successfully')
          this.busService
          .getAllBus()
          .subscribe((res)=>{
            this.busDataArray = res;
            this.createBusForm.reset()
            
            if(res === Error){
              console.log(res);
            }
            
          })
        },
        error : (e :any) =>{
          console.log(e)
        }
      });
    }
}

 

  onSubmit() {
    this.submitted = true;
    console.log(this.createBusForm.value);
    

  }





}
