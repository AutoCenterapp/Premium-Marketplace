import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fvrt-car-card',
  templateUrl: './fvrt-car-card.component.html',
  styleUrls: ['./fvrt-car-card.component.css']
})
export class FvrtCarCardComponent implements OnInit {

  @Input() savedVehicle: any;
  constructor() { }

  ngOnInit(): void {
  }

  routeToView(car: any){
  }

}
