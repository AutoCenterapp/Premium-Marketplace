import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-select-offer',
  templateUrl: './select-offer.component.html',
  styleUrls: ['./select-offer.component.css']
})
export class SelectOfferComponent implements OnInit {

  constructor(private backendService: BackendService, private route: ActivatedRoute, private router: Router) { }

  leadId: any = 1;
  lead: any = [];
  vehicle: any = [];
  leadOffers: any = [];
  ngOnInit(): void {
    this.leadId = Number(this.route.snapshot.paramMap.get('id') || '');
    if (this.leadId != undefined && this.leadId != null) {
      this.getLead();
    }
  }

  getLead() {
    this.backendService.getLead(this.leadId).subscribe((response: any) => {
      if (response.status == 200 && response.body) {
        this.lead = response.body;
        if(response.body.hasOwnProperty('vehicle')){
          this.vehicle = response.body.vehicle;
        } else {
          this.getVehicle(this.lead?.vehicle_id)
        }
        this.getLeadOffers()
      }
    });
  }

  getVehicle(vehicleId: any){
    this.backendService.getVehicleThroughId(vehicleId).subscribe((response: any) => {
      if (response.status == 200 && response.body) {
        this.vehicle = response.body;
      }
    })
  }

  getLeadOffers(){
    this.backendService.getLeadOffers(this.leadId).subscribe((response: any) => {
      if (response.status == 200 && response.body) {
        this.leadOffers = response.body;
      }
    });
  }

  selectOffer(leadOffer: any){
    this.backendService.postSelectedOffer(this.leadId, leadOffer?.id).subscribe((response: any) => {
      if (response.success=='success') {
        this.router.navigate(['/thank-you-for-submiting/'+this.leadId])
        // this.router.navigate(['/review/'+this.leadId])
      }
    });
  }

}
