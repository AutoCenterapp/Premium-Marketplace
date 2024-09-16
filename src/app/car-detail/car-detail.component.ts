import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendService} from '../services/backend.service';
import {CheckAuthService} from "../services/check-auth.service";
import {ToastrService} from 'ngx-toastr';
import {GeneralObservablesService} from '../services/general-observables.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  campaignId: any;
  vehicleId: any = 1;
  vehicleSlug: any;
  dealershipSlug: any;
  vehicle: any = [];
  isSaved: boolean = false;
  isSavedId: any = 0;
  ip: string = '';
  userDetails: any = '';
  showLoader: any = false;


  constructor(private titleService: Title, private activatedRoute: ActivatedRoute, private generalObservables: GeneralObservablesService, private toasterService: ToastrService, private router: Router, private checkAuthService: CheckAuthService, private backendService: BackendService, private route: ActivatedRoute) {
    this.generalObservables.getLoaderVal().subscribe(val => {
      this.showLoader = val;
    })
    this.vehicleSlug = this.activatedRoute.snapshot.params['vehicleSlug'];
    this.dealershipSlug = this.activatedRoute.snapshot.params['dealershipSlug'];
    if (sessionStorage.hasOwnProperty('CID')) {
      this.campaignId = sessionStorage.getItem('CID');
    }
  }

  ngOnInit(): void {
    if (this.vehicleSlug != undefined && this.vehicleSlug != null) {
      this.titleService.setTitle('Auto Center - ' + this.vehicleSlug)
      this.getVehicle();
    }

  }


  getVehicle() {
    this.showLoader = true;
    this.backendService.getVehicleThroughSlug(this.vehicleSlug).subscribe((response: any) => {
      this.showLoader = false;
      if (response.status == 200 && response.body) {
        this.vehicle = response.body[0];
        this.vehicleId = this.vehicle.id;
        this.getIp();
      }
    });
  }

  public vehicleViewCount(ip: string) {
    let addVehicleViewBody: any = {
      "vehicle_id": this.vehicleId,
      "user_ip": ip
    }
    this.backendService.getVehicleView(ip, this.vehicleId).subscribe((response: any) => {
      if (response.status == 200 && response.body && response.body.length == 0) {
        if (this.campaignId != undefined || this.campaignId != null) {
          addVehicleViewBody.ad_id = this.campaignId;
        }
        this.backendService.addVehicleView(addVehicleViewBody).subscribe((response: any) => {
        });
      }
    });
  }

  getIp() {
    let ip = '';
    let classRef = this;
    fetch('https://jsonip.com/')
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        ip = myJson.ip;
        classRef.vehicleViewCount(ip);
      });


  }


}
