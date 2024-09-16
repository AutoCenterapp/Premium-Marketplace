import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../services/backend.service';
import { CheckAuthService } from '../services/check-auth.service';
import { ToOpenMiniChatBoxService } from '../services/to-open-mini-chat-box.service';
import { GeneralObservablesService } from '../services/general-observables.service';
import { SignupModalComponent } from '../shared/signup-modal/signup-modal.component';

@Component({
  selector: 'app-car-details-right-side',
  templateUrl: './car-details-right-side.component.html',
  styleUrls: ['./car-details-right-side.component.css']
})
export class CarDetailsRightSideComponent implements OnInit {

  @ViewChild("termsAndConditionModal", { static: true }) termsAndConditionModal: ElementRef | undefined;
  iAcceptTerms: any = false;
  constructor(private generalObservables: GeneralObservablesService, private modalService: NgbModal, private toasterService: ToastrService, private checkAuthService: CheckAuthService, private backendService: BackendService) {
    this.getUserDetails()
  }

  checkIfLogin(){
    return this.checkAuthService.IsLogin()
  }

  @Input() vehicle: any;
  @Input() campaignId: any;
  savedVehicles: any = []
  isSaved: boolean = false;
  isSavedId: any = 0;
  userDetails: any = '';
  dealerShip: any = [];

  ngOnInit(): void {
    this.dealerShip = this.vehicle.dealership;
    if (this.checkAuthService.IsLogin()==true) {
      this.isVehicleSaved();
    }
  }

  estimatedPayment = 0;
  creditScore = [
    { 'title': 'Rebuilding', 'range': '<640', 'usedCarAPR': 0.1192, 'newCarAPR': 0.1774, 'selected': true },
    { 'title': 'Fair', 'range': '641-679', 'usedCarAPR': 0.0765, 'newCarAPR': 0.1126, 'selected': false },
    { 'title': 'Good', 'range': '680-739', 'usedCarAPR': 0.0468, 'newCarAPR': 0.0604, 'selected': false },
    { 'title': 'Excellent', 'range': '>740', 'usedCarAPR': 0.0365, 'newCarAPR': 0.0429, 'selected': false },
  ];
  loanTerm = [
    { 'title': '36 mo', 'value': 36, 'selected': true },
    { 'title': '48 mo', 'value': 48, 'selected': false },
    { 'title': '60 mo', 'value': 60, 'selected': false },
    { 'title': '72 mo', 'value': 72, 'selected': false },
  ];
  downPayment = 0;
  selectedLoanTerm: any = this.loanTerm[0];
  selectedCreditScore: any = this.creditScore[0];

  calculateEstimatedPrice() {
    let P = this.vehicle?.price - Number(this.downPayment);
    let apr = this.vehicle?.condition == 'New' ? this.selectedCreditScore.newCarAPR : this.selectedCreditScore.usedCarAPR
    let i: any = apr / 12;
    let n = this.selectedLoanTerm.value;
    this.estimatedPayment = P * ((i * Math.pow((1 + i), n)) / ((Math.pow((1 + i), n)) - 1));
  }

  getUserDetails() {
    this.userDetails = this.checkAuthService.getUserDetails();
    if (this.userDetails && this.userDetails != '') {
      this.userDetails = JSON.parse(this.userDetails);
    }
  }

  makeSelection(array: any, selectedVal: any, type: string) {
    array.forEach((element: any) => {
      element.selected = false;
    });
    selectedVal.selected = true;
    if (type == 'cs') {
      this.selectedCreditScore = selectedVal
      // this.calculateEstimatedPrice(this.vehicle?.condition=='New'?selectedVal.newCarAPR: selectedVal.usedCarAPR)
    } else {
      this.selectedLoanTerm = selectedVal
      // this.calculateEstimatedPrice(selectedVal.value)
    }
    return selectedVal;
  }

  scrollToCalc(className: string) {
    const elementList = document.querySelectorAll('.' + className);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }

  isVehicleSaved() {
    this.backendService.isVehicleSaved(this.userDetails?.id, this.vehicle.id).subscribe((response: any) => {
      if (response.status == 200 && response.body && response.body.length > 0) {
        this.savedVehicles = response.body;
        if (this.savedVehicles.length > 0) {
          this.isSaved = true;
          this.isSavedId = this.savedVehicles[0]?.id;
        } else {
          this.isSaved = false;
          this.isSavedId = 0;
        }
      } else {
        this.isSaved = false;
        this.isSavedId = 0;
      }
    });
  }

  removeSavedVehicles() {
    this.backendService.removeSavedVehicles(this.isSavedId).subscribe((response: any) => {
      this.isVehicleSaved()
    });
  }

  addSavedVehicles() {
    let addSavedVehicleBody: any = {
      "vehicle_id": this.vehicle.id,
      "user_id": this.userDetails?.id
    }
    if (this.campaignId != undefined || this.campaignId != null) {
      addSavedVehicleBody.ad_id = this.campaignId;
    }
    this.backendService.addSavedVehicles(addSavedVehicleBody).subscribe((response: any) => {
      if (response.ok == true) {
        this.isVehicleSaved();
      }
    });
  }


  navigateToApplyOnline() {
    if(this.campaignId != undefined){
      sessionStorage.setItem('CID', this.campaignId)
    }
  }

  // addQuerySection

  addQuery() {
    let userDetails: any = this.checkAuthService.getUserDetails();
    if (userDetails != undefined || userDetails != null || userDetails != '') {
      userDetails = JSON.parse(userDetails)
      this.addQueryForm.controls.email.setValue(userDetails?.email);
      this.addQueryForm.controls.phone.setValue(userDetails?.phone);
      this.addQueryForm.controls.lead_user_id.setValue(userDetails?.id);
      this.addQueryForm.controls.vehicle_id.setValue(this.vehicle.id);
      this.addQueryForm.controls.dealership_id.setValue(this.dealerShip.id)
      this.addQueryForm.controls.first_name.setValue(userDetails.name.split(' ')[0] || '');
      this.addQueryForm.controls.middle_name.setValue(userDetails.name.split(' ')[1] || '');
      this.addQueryForm.controls.last_name.setValue(userDetails.name.split(' ')[2] || '');
      if(this.addQueryForm.controls.last_name.value=='') {
        this.addQueryForm.controls.last_name.setValue(this.addQueryForm.controls.middle_name.value);
        this.addQueryForm.controls.middle_name.setValue('');
      }

      if (this.campaignId != undefined || this.campaignId != null) {
        this.addQueryForm.controls.ad_id.setValue(this.campaignId);
      }
      this.generalObservables.setLoaderVal(true);
      this.backendService.applyOnline(this.addQueryForm.value).subscribe({
          next: (response) => {this.generalObservables.setLoaderVal(false);
              this.iAcceptTerms = false;
              this.makeNewLeadAlert(response)},
          error: () => { this.iAcceptTerms = false;this.generalObservables.setLoaderVal(false)},
          complete: () => { this.generalObservables.setLoaderVal(false)}
        })
      // .subscribe((response: any) => {
      //   this.generalObservables.setLoaderVal(false);
      //   this.iAcceptTerms = false;
      //   this.makeNewLeadAlert(response)
      // });
    }

  }

  makeNewLeadAlert(resp: any) {
    this.toasterService.success("Your Query has been submitted successfully.", '', {
      timeOut: 3000,
    });

  }

  // makeNewLeadAlertApiHasBeenCalled() {
  //   this.toasterService.success("Your Query has been submitted successfully.", '', {
  //     timeOut: 3000,
  //   });
  // }

  public addQueryForm = new FormGroup({
    email: new FormControl(''),
    first_name: new FormControl(''),
    middle_name: new FormControl(''),
    last_name: new FormControl(''),
    vehicle_id: new FormControl(''),
    ad_id: new FormControl(''),
    phone: new FormControl(''),
    dealership_id: new FormControl(''),
    lead_user_id: new FormControl(''),
    lead_type : new FormControl('Inquiry'),
    lead_source : new FormControl('Marketplace'),
  });

  print(): void {
    // @ts-ignore
    document.getElementById('header').style.display = 'none';
    // @ts-ignore
    document.getElementById('cars-list').style.display = 'none';
    // @ts-ignore
    document.getElementById('f-table').style.display = 'none';
    // @ts-ignore
    document.getElementById('warranty').style.display = 'none';
    // @ts-ignore
    document.getElementById('footer').style.display = 'none';

    // @ts-ignore
    window.print();
    // @ts-ignore
    document.getElementById('header').style.display = 'block';
    // @ts-ignore
    document.getElementById('f-table').style.display = 'block';
    // @ts-ignore
    document.getElementById('cars-list').style.display = 'block';
    // @ts-ignore
    document.getElementById('warranty').style.display = 'block';
    // @ts-ignore
    document.getElementById('footer').style.display = 'block';
  }

  termsAndConditionsAccepted() {
    if (this.iAcceptTerms == false) {
      return
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.modalService.dismissAll();
    if (this.checkAuthService.IsLogin()==true) {
      this.addQuery()
    }
  }

  accepTermsAndConditions() {
    if (this.checkAuthService.IsLogin()==true) {
      const config: NgbModalOptions = {
        backdrop: 'static',
        keyboard: false,
      };
      this.modalService.open(this.termsAndConditionModal, config);
    } else {
      this.openSignUpModal()
    }
  }

  openSignUpModal() {
    if (!this.modalService.hasOpenModals()) {
      const config: NgbModalOptions = {
        backdrop: 'static',
        keyboard: false,
        size: 'md'
      };
      const modalRef = this.modalService.open(SignupModalComponent, config);
      modalRef.componentInstance.valueFromModal.subscribe(() => {
        this.modalService.dismissAll();
        this.accepTermsAndConditions();
      })
    }
  }

  eventReceivedFromChild(event: any){
    if(event=='inquiry'){
      this.accepTermsAndConditions()
    }
  }

}
