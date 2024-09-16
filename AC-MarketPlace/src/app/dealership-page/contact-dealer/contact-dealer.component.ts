import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact-dealer',
  templateUrl: './contact-dealer.component.html',
  styleUrls: ['./contact-dealer.component.css']
})
export class ContactDealerComponent implements OnInit {

  @Input() dealerShipData: any;
  destinationUrl: any;
  showApplyOnlineBtn: any = true;

  constructor(private router: Router) {
    this.showApplyOnlineBtn = this.router.url.includes('apply-online')?false:true
  }

  ngOnInit(): void {

  }

}
