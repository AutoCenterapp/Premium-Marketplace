import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {environment} from 'src/environments/environment';
import {BackendService} from '../services/backend.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-dealerships',
  templateUrl: './dealerships.component.html',
  styleUrls: ['./dealerships.component.css']
})
export class DealershipsComponent implements OnInit {
  showHideSearchFilters: any = false;
  loadingData: any = false;
  pageNumber: number = 1;
  totalCount: number = 0;
  slideConfig = {
    "slidesToShow": 3, "slidesToScroll": 1, 'autoplay': true, 'dots': true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  dealerShips: any = [];
  filteredDealerShips: any = [];

  constructor(private backendService: BackendService, private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Auto Center - Dealerships')
    this.getDealerShips()
  }

  getDealerShips() {
    if (this.totalCount <= this.dealerShips.length && (this.dealerShips.length != 0 || this.totalCount != 0)) {
      return
    }
    let zipCode = localStorage.getItem('postal_address');
    this.loadingData = true;
    this.backendService.getDealerShips(2, this.pageNumber, zipCode).subscribe((response: any) => {
      this.dataReceived(response)
    });
  }

  mapDealerShipData(banner: any, dealerShip: any) {
    banner.dealership = dealerShip;
    return banner
  }

  radiusArray = ['10 Miles', '20 Miles', '30 Miles', '40 Miles', '50 Miles', '60 Miles', '70 Miles', '80 Miles', '90 Miles', '100 Miles', 'Nationwide'];
  selectedRadius: any = 'Nationwide';
  isRadiusChanged: Boolean = false;

  filterDealerShips(radius: any) {
    this.isRadiusChanged = true;
    this.selectedRadius = radius;
    if (this.selectedRadius == 'Nationwide') {
      this.isRadiusChanged = false;
      radius = 1000000000000000;
    } else {
      radius = Number(radius.split(' ')[0])
    }
    this.filteredDealerShips = this.dealerShips.filter((dealership: any) => dealership.distance <= radius)
  }

  dataReceived(response: any) {
    if (response.status == 200 && response.body && response.body.length > 0) {
      response.body.forEach((data: any) => {
        this.dealerShips.push(data);
      })
      this.pageNumber = this.pageNumber + 1;
      this.filteredDealerShips = this.dealerShips;
      this.filteredDealerShips = this.filteredDealerShips.sort((a: any, b: any) => (a.distance < b.distance ? -1 : 1));
    }
    this.loadingData = false;
    this.totalCount = response.headers.get('X-Pagination-Total-Count');
  }

  // search dealerships portion
  searchVehiclesCtrl = new FormControl();
  searchAgainstQueryCalled: boolean = false;

  getDealerShipsAgainstQuery() {
    if (this.searchVehiclesCtrl.value == null) {
      return
    }
    let zipCode = localStorage.getItem('postal_address');
    this.loadingData = true;
    this.backendService.getDealerShipsAgainstQuery(2, this.pageNumber, zipCode, this.searchVehiclesCtrl.value).subscribe((response: any) => {
      this.searchAgainstQueryCalled = true;
      this.dealerShips = [];
      this.filteredDealerShips = [];
      this.dataReceived(response)
    })
  }

  clearSearchFilters() {
    this.searchAgainstQueryCalled = false;
    this.searchVehiclesCtrl.reset();
    this.totalCount = 0;
    this.dealerShips = [];
    this.pageNumber = 1
    this.getDealerShips();
  }


}
