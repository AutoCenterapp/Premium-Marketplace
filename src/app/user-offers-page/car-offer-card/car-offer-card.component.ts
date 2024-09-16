import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CheckAuthService} from 'src/app/services/check-auth.service';
import {ToOpenMiniChatBoxService} from 'src/app/services/to-open-mini-chat-box.service';

@Component({
  selector: 'app-car-offer-card',
  templateUrl: './car-offer-card.component.html',
  styleUrls: ['./car-offer-card.component.css']
})
export class CarOfferCardComponent implements OnInit {

  @Input() offer: any;
  @Input() loadingData: any;

  constructor(private toasterService: ToastrService, private checkAuthService: CheckAuthService, private router: Router, private miniChatBoxService: ToOpenMiniChatBoxService) {
  }

  ngOnInit(): void {
  }

  route() {

    if (!this.offer?.vehicle) {
      this.router.navigate(['/thank-you-for-applying/' + this.offer?.id])
    } else if (this.offer?.lead_state == 'Qualified For Offer') {
      this.router.navigate(['/select-offer/' + this.offer?.id])
    } else if (this.offer?.lead_state == 'In Review') {
      this.router.navigate(['/thank-you-for-submiting/' + this.offer?.id])
    } else {
      this.router.navigate(['/get-qualified/' + this.offer?.id])
    }
  }

  openChatMiniBox(dealership_id: any) {
    if (this.checkAuthService.IsLogin() == true) {
      this.miniChatBoxService.setMiniChatBoxVal({openOrClose: 'open', dealerShipId: dealership_id})
    } else {
      this.toasterService.info("Please login to chat with dealer.", '', {
        timeOut: 3000,
      });
    }
  }

  private get numberOfFullStars(): number {
    return Math.floor(this.offer?.vehicle?.rating);
  }

  private get numberOfEmptyStars(): number {
    return 5 - Math.ceil(this.offer?.vehicle?.rating);
  }

  get fullStars(): any {
    return isNaN(this.numberOfFullStars) ? 0 : Array(this.numberOfFullStars)
  }

  get emptyStars(): any {
    return isNaN(this.numberOfEmptyStars) ? 0 : Array(this.numberOfEmptyStars)
  }

}
