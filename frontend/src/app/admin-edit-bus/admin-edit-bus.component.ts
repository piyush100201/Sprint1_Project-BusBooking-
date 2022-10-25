// Decorators and Lifehooks
import { Component, OnInit } from '@angular/core';




// Forms
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';

// Router
import { ActivatedRoute, Router } from '@angular/router';

// Services

import { BusService } from 'src/app/service/bus.service';

// Custom Validators

import { DatePipe } from '@angular/common';

// import { isUrlValidator } from '../../core/directives/is-url.directive';
// import { isIsbnValidator } from '../../core/directives/is-isbn.directive';
import { Bus } from '../models/bus.model';
@Component({
  selector: 'app-admin-edit-bus',
  templateUrl: './admin-edit-bus.component.html',
  styleUrls: ['./admin-edit-bus.component.css']
})
export class AdminEditBusComponent implements OnInit {
  busId!: string;
  formSubmitted = false;
  formNotSubmitted = true;
  editBusForm!: FormGroup;
  busDataArray: Bus[] = [];
  submitted = false;
  busForm!: FormGroup;
  busArray: Bus[] = [];
  Types: any = ['Sleeper', 'Semi-sleeper'];
  Cities: any = ['Delhi', 'Bombay', 'Kolkata', 'Mumbai'];

  busNumber!: FormControl;
  companyName!: FormControl;
  busType!: FormControl;
  startCity!: FormControl;
  destination!: FormControl;
  departTime!: FormControl;
  departDate!: FormControl;
  pricePerSeat!: FormControl;
  seatsRow!: FormControl;
  seatsCol!: FormControl;
  driverName!: FormControl;
  driverNumber!: FormControl;


  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private busService: BusService,
    private router: Router,
    private datePipe: DatePipe
  ) {

  }


  ngOnInit(): void {
    this.busId = this.route.snapshot.paramMap.get('id')!;

    this.busNumber = new FormControl('', [Validators.required]);
    this.companyName = new FormControl('', [Validators.required]);
    this.busType = new FormControl('', [Validators.required]);
    this.startCity = new FormControl('', [Validators.required]);
    this.destination = new FormControl('', [Validators.required]);
    this.departDate = new FormControl('', [Validators.required]);
    this.departTime = new FormControl('', [Validators.required]);
    this.pricePerSeat = new FormControl('', [Validators.required]);
    this.seatsRow = new FormControl('', [Validators.required]);

    this.seatsCol = new FormControl('', [Validators.required]);
    this.driverName = new FormControl('', [Validators.required]);
    this.driverNumber = new FormControl('', [Validators.required]);

    this.editBusForm = new FormGroup({
      'busNumber': this.busNumber,
      'companyName': this.companyName,
      'busType': this.busType,
      'startCity': this.startCity,
      'destination': this.destination,
      'departDate': this.departDate,
      'departTime': this.departTime,
      'pricePerSeat': this.pricePerSeat,
      'seatsRow': this.seatsRow,
      'seatsCol': this.seatsCol,
      'driverName': this.driverName,
      'driverNumber': this.driverNumber
    })


    this.updateBus();
    this.getUser(this.busId);
    this.busService
      .getAllBus()
      .subscribe((res) => {
        this.busDataArray = res;
        console.log(res);

      })
    this.busService.getAllBus().subscribe(() => {
      console.log(1);

    })

  }
  updateBus() {

  }


  getUser(id: any) {
    this.busService.getSingleBus(id).subscribe((data) => {
      console.log(data);
      console.log(data.departDate);
      let setDate = new Date(data.departDate);
      setDate.setDate(setDate.getDate() - 1);

      var x = this.datePipe.transform(setDate, 'yyyy-MM-dd');

      var time = data.departTime;
      let times = time.split(':');



      let hours = '';
      let min = '0';
      hours = time[0];
      if (time[1])
        min = time[1];


      hours = ("0" + hours).slice(-2);
      min = ("0" + min).slice(-2);
      let str = hours + ':' + min;


      this.editBusForm.patchValue({
        busNumber: data.busNumber,
        companyName: data.companyName,
        busType: data.busType,
        startCity: data.startCity,
        destination: data.destination,
        departDate: x,
        departTime: str,
        pricePerSeat: data.pricePerSeat,
        seatsRow: data.seatsRow,
        seatsCol: data.seatsCol,
        driverName: data.driver.name,
        driverNumber: data.driver.phoneNumber,

      });
    });
  }

  editBus() {
    console.log(this.editBusForm.value);
    this.formSubmitted = true;
    if (window.confirm("are you sure???")) {

      this.busService.updateSingleBusAll(this.busId, this.editBusForm.value).subscribe({
        complete: () => {
          this.router.navigateByUrl('/admin/addbus');
          console.log('Bus updated successfully....')
        },
        error: (e) => {
          console.log(e)
        }
      });
    }
  }



  onSubmit() {
    this.submitted = true;
    console.log(this.editBusForm.value);

    // this.busService
    //   .createBus(this.editBusForm.value)
    //   .subscribe((res) => {
    //     this.router.navigate([`bus/read/${res?.data?._id}`]);
    //   });
  }





}
