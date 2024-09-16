import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { CheckAuthService } from "../../services/check-auth.service";
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-user-offers',
  templateUrl: './user-offers.component.html',
  styleUrls: ['./user-offers.component.css']
})
export class UserOffersComponent implements OnInit {
  userDetails: any = '';
  loadingData: boolean = true;

  constructor(private titleService: Title,private checkAuthService: CheckAuthService, private backendService: BackendService) {
    this.getUserDetails();
  }

  myOffers: any = []

  ngOnInit(): void {
    this.titleService.setTitle('Auto Center - Offers')
    this.getMyOffers()
  }

  getUserDetails() {
    this.userDetails = this.checkAuthService.getUserDetails();
    if (this.userDetails && this.userDetails != '') {
      this.userDetails = JSON.parse(this.userDetails);
    }
  }

  getMyOffers() {
    this.loadingData = true;
    this.backendService.getMyOffers(this.userDetails?.id).subscribe((response: any) => {
      if (response.status == 200 && response.body) {
        this.myOffers = response.body;
        // this.myOffers = this.myOffers.filter((offer: any)=>offer.vehicle_id!=null)
      }
      this.loadingData = false;
    });
  }
}
