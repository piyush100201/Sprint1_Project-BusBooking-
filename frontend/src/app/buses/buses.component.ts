import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from 'src/app/service/bus.service';
import { FormGroup, FormBuilder, Validators,FormArray ,FormControl} from '@angular/forms';
import { Bus } from '../models/bus.model'; 
import { SeatNamePipe } from '../pipes/seatname.pipe';
import { Ticket } from '../models/ticket';
import { TicketService } from '../ticket.service';


@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css']
})
export class BusesComponent implements OnInit {
  busId!: string ;
  ticketId!: string ;
  submitted = false;

  editForm :FormGroup = new FormGroup({
    seats:  new FormArray([]) 
  });
  
  busData! : Bus;
  ticket! : Ticket;
  
  seatStatus: boolean[] = new Array(60).fill(false);
  selectedSeats: number[]=[];
  dumStatus: number[]=[];
  finalStatus: number[]=[];

  seatsfor : any[] = [];
  rows = 5;
  constructor(
    
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private busService: BusService,
    private ticketService: TicketService,
    private router: Router
  ) { 
    this.seatsfor = Array(60).fill(0);
     
  }

  get seats() {
    return this.editForm.get('seats') as FormArray;
  }
// 
  submit(){
    console.log(this.editForm);
    console.log(this.busData);
    localStorage.setItem('seatArray', JSON.stringify(this.selectedSeats));
    localStorage.setItem('busId', this.busData._id);
    this.submitted=true;
    // for(var i = 0; i<this.selectedSeats.length;i++){
    //   this.busData.ForEverySeat[this.selectedSeats[i]] = 1;
    // }

    if(this.selectedSeats.length){
        //@ts-ignore
      var x = localStorage.getItem("userId");
   
      const body ={
       busId:  this.busData._id,
       userId : x,
       ForEverySelectedSeat : this.selectedSeats
      }
      this.ticketService.createTicket(body)
      .subscribe((res)=>{
        this.ticketId = res?.data?._id!;
        // console.log(body.ForEverySelectedSeat);
        
        this.router.navigateByUrl('/pay/'+this.ticketId);
           
        
      })
        // this.router.navigate(['/selectSeats']);
    }
    else
      return;
  }
  ngOnInit(): void {
    this.busId= this.route.snapshot.paramMap.get('id')! ;
    this.seatStatus.forEach(() => {
      this.seats.push(new FormControl(false))
  });

  this.busService
  .getSingleBus(this.busId)
  .subscribe((res) => {
    this.busData = res;
    console.log(this.busData);
    this.seatsfor = this.busData.ForEverySeat;
    this.rows = this.busData.seatsRow;
    this.seatStatus= new Array(this.busData.totalSeats).fill(false);
    this.dumStatus= new Array(this.busData.totalSeats).fill(0);
    console.log(this.seatStatus);
    for(var i =0 ;i<this.busData.totalSeats;i++ ){
         this.seatStatus[i] = this.seatsfor[i] == 1;
    }
    console.log(this.seatStatus);
    for(var i =0 ;i<this.busData.totalSeats;i++ ){
      if(i==0)
       this.dumStatus[i] =  this.seatsfor[i] ;
      else
       this.dumStatus[i] = this.dumStatus[i-1] +  this.seatsfor[i] ;
     }
     
    console.log(this.dumStatus);
     for(var i =1 ;i<this.busData.totalSeats;i++ ){
       if(this.dumStatus[i] == this.dumStatus[i-1] ){
           var index = i - this.dumStatus[i];
           this.dumStatus[index] = i;
       }
     }
     console.log(this.dumStatus);

    
   
   
  });

  this.seatStatus.forEach(() => {
    this.seats.push(new FormControl(false))
});

 
  this.editForm?.get('seats')?.valueChanges.subscribe(selectedValue => {
    this.selectedSeats=[];
    for(var i = 0; i < this.busData.totalSeats; i++){
      if(selectedValue[i])
          this.selectedSeats.push(this.dumStatus[i]);            
    }
    console.log(this.selectedSeats);
    
})
  

  }


  get myForm() {
    return this.editForm.controls;
  }




}
// 