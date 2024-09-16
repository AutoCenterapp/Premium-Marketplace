import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dealer-location',
  templateUrl: './dealer-location.component.html',
  styleUrls: ['./dealer-location.component.css']
})
export class DealerLocationComponent implements OnInit {

  @Input() dealerShipData: any;
  mapIframe: any;

  constructor() {
  }

  ngOnInit(): void {
    this.mapIframe = 'https://maps.google.com/maps?q=' + this.dealerShipData?.location_lat + ',' + this.dealerShipData?.location_lng + '&z=20&output=embed';
  }

}
