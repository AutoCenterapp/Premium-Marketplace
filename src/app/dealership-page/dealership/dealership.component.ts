import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BackendService} from 'src/app/services/backend.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-dealerships',
  templateUrl: './dealership.component.html',
  styleUrls: ['./dealership.component.css']
})
export class DealershipComponent implements OnInit {

  loadingData: any = true;
  sortingType: any = 'ascending';
  sortBy: any = 'transID';
  currentSelection: any = 'Listing Date: Newest first';
  specificDealerShip: any = {};
  vehicles: any = [];
  totalCount: number = 0;
  pageNumber: number = 1;
  dealerShipId: any = 1;
  dealershipSlug: any;

  constructor(private titleService: Title, private backendService: BackendService, private activatedRoute: ActivatedRoute) {
    this.dealershipSlug = this.activatedRoute.snapshot.params['dealershipSlug'];
  }

  ngOnInit(): void {

    this.titleService.setTitle('Auto Center - ' + this.dealershipSlug)
    this.getSpecificDealerShip();
  }

  getSpecificDealerShip() {
    this.backendService.getSpecificDealerShip(this.dealershipSlug).subscribe((response: any) => {
      if (response.status == 200 && response.body) {
        this.specificDealerShip = response.body[0];
        this.getVehicles()
      }
    });
  }

  getVehicles() {
    this.loadingData = true;
    this.backendService.getVehicles(6, this.pageNumber, `filter[dealership_id]=${this.specificDealerShip.id}`).subscribe((response: any) => {
      this.loadingData = false;
      if (response.status == 200 && response.body && response.body.length > 0) {
        this.totalCount = response.headers.get('X-Pagination-Total-Count');
        if (this.vehicles.length >= this.totalCount) {
          return
        }
        response.body.forEach((data: any) => {
          this.vehicles.push(data);
        })
      } else {
        this.vehicles = [];
      }
    });
  }

  onScroll() {
    if (this.vehicles.length >= this.totalCount) {
      return
    } else {
      this.pageNumber = this.pageNumber + 1;
      this.getVehicles()
    }
  }

  setSortingValues(sortBy: string, type: string, currentSelection: string) {
    this.sortBy = sortBy;
    this.sortingType = type;
    this.currentSelection = currentSelection
  }
}
