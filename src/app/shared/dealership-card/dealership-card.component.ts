import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CheckAuthService } from 'src/app/services/check-auth.service';
import { ToOpenMiniChatBoxService } from 'src/app/services/to-open-mini-chat-box.service';
@Component({
  selector: 'app-dealership-card',
  templateUrl: './dealership-card.component.html',
  styleUrls: ['./dealership-card.component.css']
})
export class DealershipCardComponent implements OnInit {

  @Input() dealerShip: any;
  @Input() inquiryButtonRequired: any;
  @Input() chatWithDealerButtonRequired: any;
  @Input() applyOnlineButtonRequired: any;
  @Input() applyOnlineRoute: any;
  @Output() valueChange = new EventEmitter();
  destinationUrl: any;
  constructor(private checkAuthService: CheckAuthService, private toasterService: ToastrService, private miniChatBoxService: ToOpenMiniChatBoxService) { }

  ngOnInit(): void {
    this.destinationUrl = 'https://www.google.com/maps/dir/?api=1&destination=' + this.dealerShip?.location_lat + ',' + this.dealerShip?.location_lng;
  }

  onNavigate(url: string){
    if(url!=null || url!=undefined){
      window.open((url.startsWith('https://')? url:'https://'+url), "_blank");
    }
  }

  private get numberOfFullStars(): number {
    return Math.floor(this.dealerShip?.rating);
  }

  private get numberOfEmptyStars(): number {
    return 5 - Math.ceil(this.dealerShip?.rating);
  }

  get fullStars(): any {
    return isNaN(this.numberOfFullStars) ? 0 : Array(this.numberOfFullStars)
  }

  get emptyStars(): any {
    return isNaN(this.numberOfEmptyStars) ? 0 : Array(this.numberOfEmptyStars)
  }

  emitEventToParent(methodName: string){
    this.valueChange.emit(methodName)
  }

  openChatMiniBox() {
    if (this.checkAuthService.IsLogin()==true) {
      this.miniChatBoxService.setMiniChatBoxVal({ openOrClose: 'open', dealerShipId: this.dealerShip?.chat_user_id })
    } else {
      this.toasterService.info("Please login to chat with dealer.", '', {
        timeOut: 3000,
      });
    }
  }

}
