import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-vehcile-types',
  templateUrl: './vehcile-types.component.html',
  styleUrls: ['./vehcile-types.component.css']
})
export class VehcileTypesComponent implements OnInit {

  vehicleTypes: any = []
  @ViewChild('slickModal') slickModal: SlickCarouselComponent | any;
  slideConfig = { "slidesToShow": 6, "slidesToScroll": 1, 'autoplay': false, 'dots': false,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        adaptiveWidth: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        adaptiveWidth: true
      }
    },
    {
      breakpoint: 390,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        adaptiveWidth: true
      }
    },
    {
      breakpoint: 300,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        adaptiveWidth: true
      }
    }
  ]};
  constructor(private backendService: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.loadVehcileTypes();
  }

  loadVehcileTypes() {
    this.backendService.getVehicleTypes().subscribe((response: any) => {
      if (response && response.status == 200 && response.body && response.body.length > 0) {
        this.vehicleTypes = response.body;
      }
    })
  }

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

  applySearch(type: any) {
    sessionStorage.setItem('selectedVehicleType', JSON.stringify(type));
    this.router.navigate(['/marketplace'])
  }

}
