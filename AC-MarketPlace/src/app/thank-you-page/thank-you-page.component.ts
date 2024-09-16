import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {BackendService} from 'src/app/services/backend.service';
import {CheckAuthService} from '../services/check-auth.service';
import {ToOpenMiniChatBoxService} from '../services/to-open-mini-chat-box.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-thank-you-page',
  templateUrl: './thank-you-page.component.html',
  styleUrls: ['./thank-you-page.component.css']
})
export class ThankYouPageComponent implements OnInit, OnDestroy {

  thankYouForApplyingRoute = false;

  constructor(private titleService: Title, private miniChatBoxService: ToOpenMiniChatBoxService, private toasterService: ToastrService, private checkAuthService: CheckAuthService, private route: ActivatedRoute, private backendService: BackendService, private router: Router) {
    this.thankYouForApplyingRoute = this.router.url.includes('thank-you-for-applying') ? true : false;
  }

  ngOnDestroy(): void {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
  }

  checkIfLogin() {
    return this.checkAuthService.IsLogin()
  }

  vehicle: any = [];
  leadId: any = 1;
  lead: any = [];
  leadOffers: any = [];

  ngOnInit(): void {
    this.titleService.setTitle('Auto Center - Thank You')
    this.redirectToMyOffers()
    this.leadId = Number(this.route.snapshot.paramMap.get('id') || '');
    if (this.leadId != undefined && this.leadId != null) {
      this.getLead();
    }
  }

  getLead() {
    this.backendService.getLead(this.leadId).subscribe((response: any) => {
      if (response.status == 200 && response.body) {
        this.lead = response.body;
        if (this.route.snapshot.queryParams['CID'] == undefined) {
          this.redirectToMyOffers()
        }
        this.vehicle = response.body.vehicle;
        this.getLeadOffers()
      }
    });
  }

  getLeadOffers() {
    this.backendService.getLeadOffers(this.leadId).subscribe((response: any) => {
      if (response.status == 200 && response.body) {
        this.leadOffers = response.body;
      }
    });
  }

  loginPage() {
    this.toasterService.success("Please login to proceed.", '', {
      timeOut: 3000,
    });
    this.router.navigate(['/signin'])
  }

  openChatMiniBox(dealership_id: any) {
    if (this.checkAuthService.IsLogin()) {
      this.miniChatBoxService.setMiniChatBoxVal({openOrClose: 'open', dealerShipId: dealership_id})
    } else {
      this.toasterService.info("Please login to chat with dealer.", '', {
        timeOut: 3000,
      });
    }
  }

  timeOut: any;

  redirectToMyOffers() {
    if (this.thankYouForApplyingRoute == true) {
      if (this.route.snapshot.queryParams['vehicle_id'] == undefined) {
        return
      }
      this.timeOut = setTimeout(() => {
        this.router.navigate(['/offers']);
      }, 5000);
    }
  }

}
