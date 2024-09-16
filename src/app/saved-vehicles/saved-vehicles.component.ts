import {Component, OnInit} from '@angular/core';
import {BackendService} from '../services/backend.service';
import {CheckAuthService} from "../services/check-auth.service";
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-saved-vehicles',
  templateUrl: './saved-vehicles.component.html',
  styleUrls: ['./saved-vehicles.component.css']
})
export class SavedVehiclesComponent implements OnInit {


  pageNumber: number = 8;
  savedVehicles: any = [];
  userDetails: any = '';
  totalCount: number = 0;
  loadingData: boolean = true;

  constructor(private titleService: Title, private checkAuthService: CheckAuthService, private backendService: BackendService) {
    this.getUserDetails()
  }

  ngOnInit(): void {
    this.titleService.setTitle('Auto Center - Save Vehicles')
    this.getSavedVehicles()
  }

  getUserDetails() {
    this.userDetails = this.checkAuthService.getUserDetails();
    if (this.userDetails && this.userDetails != '') {
      this.userDetails = JSON.parse(this.userDetails);
    }
  }

  getSavedVehicles() {
    this.loadingData = true;
    this.backendService.getSavedVehicles(this.userDetails?.id, this.pageNumber).subscribe((response: any) => {
      if (response.status == 200 && response.body && response.body.length > 0) {
        this.totalCount = response.headers.get('X-Pagination-Total-Count');
        this.savedVehicles = response.body;
        this.pageNumber = this.pageNumber + 8;
      } else {
        this.savedVehicles = [];
        this.loadingData = false;
      }
    });
  }

  onScroll() {
    if (this.savedVehicles.length >= this.totalCount) {
      return
    } else {
      this.pageNumber = this.pageNumber + 1;
      this.getSavedVehicles()
    }
  }

}
