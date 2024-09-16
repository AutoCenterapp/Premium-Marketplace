import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ToastrService } from 'ngx-toastr';
import { CheckAuthService } from 'src/app/services/check-auth.service';
import { ToOpenMiniChatBoxService } from 'src/app/services/to-open-mini-chat-box.service';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent implements OnInit {

  @ViewChild('slickModal') slickModal: SlickCarouselComponent | any;
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1,'autoplay': false, 'dots': false, 'infinite': false};
  @Input() car: any;
  @Input() saved_car_id: any;
  @Input() campaignId: any;
  i: any;
  constructor(private toasterService: ToastrService, private checkAuthService: CheckAuthService, private miniChatBoxService: ToOpenMiniChatBoxService) {
  }

  ngOnInit(): void {
    if(typeof (this.car.mileage)!="number"){
      this.car.mileage = Number(this.car.mileage.replace(/[,|.]/g, ''))
    }
  }
  findIsbannerImage(cars: any, length: any) {
    for (this.i = 0; this.i < length; this.i++) {
      if (cars[this.i]?.is_banner == 1) {
        return cars[this.i].image_path
      }
    }
  }

  routeToView(car: any) {
    if(this.campaignId != undefined){
      sessionStorage.setItem('CID', this.campaignId);
    }
  }

  next() {
    this.slickModal.slickNext()
  }

  prev() {
    this.slickModal.slickPrev()
  }

  openChatMiniBox(dealership_id: any){
    if(this.checkAuthService.IsLogin()==true){
      this.miniChatBoxService.setMiniChatBoxVal({openOrClose: 'open', dealerShipId: dealership_id})
    } else {
      this.toasterService.info("Please login to chat with dealer.", '', {
        timeOut: 3000,
      });
    }
  }

  private get numberOfFullStars(): number {
    return Math.floor(this.car.dealership.rating);
  }

  private get numberOfEmptyStars(): number {
    return 5 - Math.ceil(this.car.dealership.rating);
  }

  get fullStars(): any {
    return isNaN(this.numberOfFullStars)?0:Array(this.numberOfFullStars)
  }

  get emptyStars(): any {
    return isNaN(this.numberOfEmptyStars)?0:Array(this.numberOfEmptyStars)
  }


}
