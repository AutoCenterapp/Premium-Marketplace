import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-car-listing-tabs',
  templateUrl: './car-listing-tabs.component.html',
  styleUrls: ['./car-listing-tabs.component.css']
})
export class CarListingTabsComponent implements OnInit {

  @Output() valueChanges = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  changeQuery(query: string){
    this.valueChanges.emit(query)
  }

}
