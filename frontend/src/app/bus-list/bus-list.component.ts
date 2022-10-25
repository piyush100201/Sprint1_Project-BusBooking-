// Decorators and Lifehooks
import { Component, OnInit, OnDestroy } from '@angular/core';

// Router
import { ActivatedRoute } from '@angular/router';

// RXJS
import { Subscription } from 'rxjs';

// Services

import { BusService } from '../service/bus.service'; 

// Models
import { Bus } from '../models/bus.model'; 
@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css']
})
export class BusListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private busService : BusService
  ) { }

  ngOnInit(): void {
  }

}
