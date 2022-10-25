import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Ticket } from "../models/ticket";
import { TicketService } from "../ticket.service";



@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']

})
export class ViewTicketComponent implements OnInit {
  ticketId : String;
  ticket: any =[];
  constructor(private route: ActivatedRoute,
    //private ticketService:TicketGenerateService,
    private ticketService:TicketService,
    private router: Router) { }
  

ngOnInit(): void {
  this.ticketId= this.route.snapshot.paramMap.get('id')! ;
  this.ticketService.getTicketById(this.ticketId).subscribe((tktdata) =>{
    this.ticket=tktdata;
    console.log(tktdata);
    
  })

  if(!this.ticket)
          this.router.navigate(['noticket']);       
}
print(){
  
    this.router.navigate(['users']);
  
}
}
