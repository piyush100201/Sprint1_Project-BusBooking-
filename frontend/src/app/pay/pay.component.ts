import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { TicketService } from '../ticket.service';
import { Ticket } from '../models/ticket';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  totalfare:any;
  ticketId : String;
  ticket: any =[];
  constructor(private route: ActivatedRoute,
    //private ticketService:TicketGenerateService,
    private ticketService:TicketService,private router:Router){}

  ngOnInit(): void {
    this.ticketId= this.route.snapshot.paramMap.get('id')! ;
    this.ticketService.getTicketById(this.ticketId).subscribe((tktdata) =>{
      this.ticket=tktdata;
      console.log(tktdata.busId.pricePerSeat
        );
      console.log(tktdata.ForEverySelectedSeat.length);
      this.totalfare=tktdata.ForEverySelectedSeat.length*tktdata.busId.pricePerSeat;
      
  });};
  /* onsubmit(pay:NgForm){
    pay.valid
  

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  /* onsubmit(pay:NgForm){
    pay.valid
  } */
  successfullpay(){
    if(window.confirm("Are you sure???")){
      this.router.navigate(['/view-ticket/'+this.ticket._id]);
    }
    
    //{state:this.totalf}
    //console.log(this.totalf)
  }
  cancel(){
    if(window.confirm("Are you sure???")){
      this.router.navigate(['/cancelpay']);
    }
  }

}
