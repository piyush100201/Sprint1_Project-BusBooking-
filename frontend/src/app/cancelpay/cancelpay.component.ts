import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancelpay',
  templateUrl: './cancelpay.component.html',
  styleUrls: ['./cancelpay.component.css']
})
export class CancelpayComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  
  pay(){
    this.route.navigate(['/pay/:id']);
  }

}
