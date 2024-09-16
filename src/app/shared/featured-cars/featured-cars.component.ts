import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../services/backend.service";

@Component({
  selector: 'app-featured-cars',
  templateUrl: './featured-cars.component.html',
  styleUrls: ['./featured-cars.component.css']
})
export class FeaturedCarsComponent implements OnInit {

  vehicles: any = [];
  pageNumber: number = 1;
  totalCount: number = 0;
  sort: any = 'recent';
  loadingData: any = false;

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.getVehicles()
  }

  getVehicles() {
    this.loadingData = true;
    this.backendService.getSortedVehicles(this.sort,8, this.pageNumber).subscribe((response: any) => {
      this.loadingData = false;
      if (response.status == 200 && response.body && response.body.length > 0) {
        this.totalCount = response.headers.get('X-Pagination-Total-Count')
        response.body.forEach((data: any) => {
          this.vehicles.push(data);
        })
        this.pageNumber = this.pageNumber + 1;
      } else {
        this.vehicles = [];
      }
    });
  }

  onScroll() {
    if (this.vehicles.length == this.totalCount) {
      return
    } else {
      this.getVehicles()
    }
  }

  changeSelection(sort: string){
    this.vehicles = [];
    this.sort = sort;
    this.pageNumber = 1;
    this.getVehicles()
  }

}
