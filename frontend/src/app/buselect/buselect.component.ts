import { Component, OnInit } from '@angular/core';
import { BusService } from 'src/app/service/bus.service'; 

// Custom Validators
import { Router } from '@angular/router';
// import { isUrlValidator } from '../../core/directives/is-url.directive';
// import { isIsbnValidator } from '../../core/directives/is-isbn.directive';
import { Bus } from '../models/bus.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-buselect',
  templateUrl: './buselect.component.html',
  styleUrls: ['./buselect.component.css']
})
export class BuselectComponent implements OnInit {
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
searchText: any;


  constructor( private router: Router,
    private busService: BusService) { }

  ngOnInit(): void {this.busNumber=new FormControl('',[Validators.required]);
  this.companyName=new FormControl('',[Validators.required]);
  this.busType=new FormControl('',[Validators.required]) ;
  this.startCity=new FormControl('',[Validators.required]);
  this.destination=new FormControl('',[Validators.required]);
  this.departDate=new FormControl('',[Validators.required]);
  this.departTime=new FormControl('',[Validators.required]);
  this.pricePerSeat=new FormControl('',[Validators.required]);
  this.seatsRow=new FormControl('',[Validators.required]);

  this.seatsCol=new FormControl('',[Validators.required]);
  this.driverName=new FormControl('',[Validators.required]);
  this.driverNumber=new FormControl('',[Validators.required]);
  
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
          console.log(res);
          
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


