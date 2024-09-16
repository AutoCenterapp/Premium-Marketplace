import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SlugifyPipe } from '../pipes/slugify.pipe';
import {BackendService} from '../services/backend.service';
import { CheckAuthService } from '../services/check-auth.service';
import { ToOpenMiniChatBoxService } from '../services/to-open-mini-chat-box.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css'],
  providers: [SlugifyPipe]
})
export class AdsComponent implements OnInit {

  campaignData: any = {};
  campaignId: any;
  constructor(private miniChatBoxService: ToOpenMiniChatBoxService,
    private toasterService: ToastrService,
    private slugify: SlugifyPipe,
    private router: Router,
     private checkAuthService: CheckAuthService,
     private backendService: BackendService, private route: ActivatedRoute) {
    if(this.route.snapshot.paramMap.get('id')){
      this.campaignId = this.route.snapshot.paramMap.get('id');
    }
  }

  ngOnInit(): void {
    this.getCampaignAds()
  }

  getCampaignAds() {
    this.backendService.getCampaignAds(this.campaignId).subscribe((response: any) => {
      if (response.status == 200 && response.body && response.body.length > 0) {
        this.campaignData = response.body[0];
        this.markAsViewed(this.campaignData?.campaign_ad_id);
      }
    });
  }

  async markAsViewed(campaignId: Number) {
    if (this.campaignId != undefined || this.campaignId != null) {
      let body = {
        user_ip: 123,
        ad_id: campaignId
      }
      await fetch("https://api.ipify.org/?format=json").then(results => results.json()).then(data => {
        body.user_ip = data.ip;
      });
      this.backendService.vehicleViewedThroughCampaign(body).subscribe((response: any) => {
        if (response.body && response.body.user_ip == body.user_ip) {
          console.log("Successfully visited through user's ip");
        }
      });
    }
  }

  onNavigate(url: string){
    if(url!=null || url!=undefined){
      window.open((url.startsWith('https://')? url:'https://'+url), "_blank");
    }
  }

  private get numberOfFullStars(): number {
    return Math.floor(this.campaignData?.campaignAd?.campaign?.user?.dealership?.rating!=null?this.campaignData?.campaignAd?.campaign?.user?.dealership?.rating:0);
  }

  private get numberOfEmptyStars(): number {
    return 5 - Math.ceil(this.campaignData?.campaignAd?.campaign?.user?.dealership?.rating!=null?this.campaignData?.campaignAd?.campaign?.user?.dealership?.rating:0);
  }

  get fullStars(): any {
    return isNaN(this.numberOfFullStars)?0:Array(this.numberOfFullStars)
  }

  get emptyStars(): any {
    return isNaN(this.numberOfEmptyStars)?0:Array(this.numberOfEmptyStars)
  }

  applyOnline(dealership: any){
    let slugifyRoute = this.slugify.transform(dealership?.business_name);
    if(this.campaignId != undefined){
      sessionStorage.setItem('CID', this.campaignId);
    }
    this.router.navigate(['/apply-online/' + slugifyRoute])
  }

  openChatMiniBox(){
    if(this.checkAuthService.IsLogin()==true){
      this.miniChatBoxService.setMiniChatBoxVal({openOrClose: 'open', dealerShipId: this.campaignData?.campaignAd?.campaign?.user?.dealership?.chat_user_id})
    } else {
      this.toasterService.info("Please login to chat with dealer.", '', {
        timeOut: 3000,
      });
    }
  }

}
