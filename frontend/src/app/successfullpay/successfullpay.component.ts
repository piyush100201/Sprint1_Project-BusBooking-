import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successfullpay',
  templateUrl: './successfullpay.component.html',
  styleUrls: ['./successfullpay.component.css']
})
export class SuccessfullpayComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  viewticket(){
    this.route.navigate(['/view-ticket'],
    );
  }

}
