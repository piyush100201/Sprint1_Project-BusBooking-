import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header3',
  templateUrl: './header3.component.html',
  styleUrls: ['./header3.component.css']
})
export class Header3Component implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  getAdminProfile(){
    this.route.navigateByUrl('adminprofile/:id');
  }
}
