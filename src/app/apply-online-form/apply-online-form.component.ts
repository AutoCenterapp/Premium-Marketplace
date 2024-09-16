import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {BackendService} from '../services/backend.service';
import {CheckAuthService} from '../services/check-auth.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-apply-online-form',
  templateUrl: './apply-online-form.component.html',
  styleUrls: ['./apply-online-form.component.css']
})
export class ApplyOnlineFormComponent implements OnInit {

  iAcceptTerms: any = false;
  saveInfoWhileApplying: boolean = false;
  vehicleSlug: any;
  dealershipSlug: any;
  dealerShip: any;
  UID: any;
  showLoader: any = false
  // incomeTypes = ['Auto Worker', 'Clerical', 'Craftsman', 'Executive/Managerial', 'Farmer', 'Fisherman', 'Government', 'Homemaker', 'Other', 'Professional', 'Sales/Advertising', 'Semi-skilled Labour', 'Skilled Labour'];
  incomeTypes = ['W2 Employee', 'Self Employed', 'Disability', 'Cash'];
  statusTypes = ['Full Time', 'Active Military', 'Contract', 'Not Applicable', 'Part Time', 'Retired', 'Seasonal', 'Self Employed', 'Temporary'];
  incomeIntervals = ['Monthly', 'Weekly', 'Biweekly', 'Semimonthly', 'Yearly']
  @ViewChild("termsAndConditionModal", {static: true}) termsAndConditionModal: ElementRef | undefined;
  preSavedUserDetails: any;
  vehicleUserApplyingFor: any = {};
  toggleSettings = {
    showApplyOnlineForm: true,
    showSignupForm: false
  }

  constructor(private titleService: Title, private activatedRoute: ActivatedRoute, public zone: NgZone, private modalService: NgbModal, private route: ActivatedRoute, private checkAuthService: CheckAuthService, private backendService: BackendService, private router: Router,
              private toasterService: ToastrService) {
    this.vehicleSlug = this.activatedRoute.snapshot.params['vehicleSlug']
    this.dealershipSlug = this.activatedRoute.snapshot.params['dealershipSlug'];
    if (sessionStorage.hasOwnProperty('CID')) {
      this.applyOnlineForm.controls.ad_id.setValue(sessionStorage.getItem('CID'));
    }    
  }

  public applyOnlineForm = new FormGroup({
    ssn: new FormControl('', Validators.compose([Validators.required])),
    drive_license_number: new FormControl(''),
    phone: new FormControl('', Validators.compose([Validators.required])),
    current_address: new FormControl('', Validators.compose([Validators.required])),
    current_city: new FormControl('', Validators.compose([Validators.required])),
    current_state: new FormControl('', Validators.compose([Validators.required])),
    current_zip_code: new FormControl('', Validators.compose([Validators.required])),
    down_payment: new FormControl('', Validators.compose([Validators.required])),
    vehicle_id: new FormControl(''),
    user_id: new FormControl(''),
    created_at: new FormControl('2022-08-31 10:15:19'),
    current_address_type: new FormControl('', Validators.compose([Validators.required])),
    current_length_at_address: new FormControl('', Validators.compose([Validators.required])),
    gender: new FormControl('', Validators.compose([Validators.required])),
    lead_state: new FormControl('New'),
    updated_at: new FormControl('2022-08-31 10:15:19'),
    first_name: new FormControl('', Validators.required),
    middle_name: new FormControl(''),
    last_name: new FormControl('', Validators.compose([Validators.required])),
    dob: new FormControl('', Validators.compose([Validators.required])),
    suffix: new FormControl(''),
    email: new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[a-z A-Z 0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z A-Z]{2,4}$")])),
    ad_id: new FormControl(''),
    dealership_id: new FormControl(''),
    lead_type: new FormControl('Credit Application'),
    lead_source: new FormControl('Marketplace'),
    lead_user_id: new FormControl(),


    empName: new FormControl('', Validators.required),
    empPhone: new FormControl(''),
    empAmount: new FormControl(''),
    empLengthOfJob: new FormControl('', Validators.required),
    empIncomeType: new FormControl(this.incomeTypes[0]),
    empStatus: new FormControl(this.statusTypes[0]),
    empIncomeInterVal: new FormControl(this.incomeIntervals[0]),
  });

  get ssn() {
    return this.applyOnlineForm.get('ssn');
  }

  get phone() {
    return this.applyOnlineForm.get('phone');
  }

  get current_address() {
    return this.applyOnlineForm.get('current_address');
  }

  get current_city() {
    return this.applyOnlineForm.get('current_city');
  }

  get current_state() {
    return this.applyOnlineForm.get('current_state');
  }

  get current_zip_code() {
    return this.applyOnlineForm.get('current_zip_code');
  }


  get down_payment() {
    return this.applyOnlineForm.get('down_payment');
  }

  get current_address_type() {
    return this.applyOnlineForm.get('current_address_type');
  }

  get current_length_at_address() {
    return this.applyOnlineForm.get('current_length_at_address');
  }

  get first_name_apply() {
    return this.applyOnlineForm.get('first_name');
  }

  get last_name_apply() {
    return this.applyOnlineForm.get('last_name');
  }

  get dob() {
    return this.applyOnlineForm.get('dob');
  }

  get email_apply() {
    return this.applyOnlineForm.get('email');
  }

  get gender() {
    return this.applyOnlineForm.get('gender');
  }

  get empName() {
    return this.applyOnlineForm.get('empName');
  }

  get empLengthOfJob() {
    return this.applyOnlineForm.get('empLengthOfJob');
  }


  ngOnInit(): void {
    this.titleService.setTitle('Auto Center - Apply Online')
    this.showLoader = true
    if (this.vehicleSlug != undefined) {
      this.getVehicleUserApplyingFor()
    } else {
      if (this.route.snapshot.queryParams.hasOwnProperty('UID')) {
        this.UID = this.route.snapshot.queryParams['UID'];
        this.checkIfInvitationHasExpired()
      } else {
        this.getSpecificDealerShip()
      }
    }
  }

  getUserProfile(){
    let userProfile: any = this.checkAuthService.getUserDetails();
    if(userProfile!=null && userProfile!=''){
      userProfile = JSON.parse(userProfile)      
      this.backendService.getUserProfile(userProfile.id|| 0).subscribe((response: any) => {
        if (response.status == 200 && response.body) {
          this.showLoader = false;
          response.body = JSON.parse(response.body)
          this.preSavedUserDetails = response.body.user;
          this.setUserProfile()
        }
      })
    } else {
      this.showLoader = false;
    }    
  }

  getVehicleUserApplyingFor() {
    this.backendService.getVehicleThroughSlug(this.vehicleSlug).subscribe((response: any) => {
      if (response.status == 200 && response.body) {
        this.vehicleUserApplyingFor = response.body[0];
        this.applyOnlineForm.controls.dealership_id.setValue(response.body[0]?.dealership_id)
        if (this.vehicleUserApplyingFor != null && this.vehicleUserApplyingFor != undefined) {
          this.dealerShip = this.vehicleUserApplyingFor.dealership;
          // nullifying dealership data as dealership
          // section in car component is not required
          this.vehicleUserApplyingFor.dealership = null;
        }
        this.applyOnlineForm.controls.vehicle_id.setValue(this.vehicleUserApplyingFor != null ? this.vehicleUserApplyingFor.id : null);
      }
      this.getUserProfile()
    });
  }

  getSpecificDealerShip() {
    this.backendService.getSpecificDealerShip(this.dealershipSlug).subscribe((response: any) => {
      if (response.status == 200 && response.body) {
        this.dealerShip = response.body[0];
        this.applyOnlineForm.controls.dealership_id.setValue(response.body[0]?.id)
      }
      this.getUserProfile()
    });
  }

  setUserProfile() {
    if (this.preSavedUserDetails) {
      this.applyOnlineForm.controls.first_name.setValue(this.preSavedUserDetails.firstname||'');
      this.applyOnlineForm.controls.middle_name.setValue(this.preSavedUserDetails.middlename||'');
      this.applyOnlineForm.controls.last_name.setValue(this.preSavedUserDetails.lastname||'');
      this.applyOnlineForm.controls.email.setValue(this.preSavedUserDetails.email||'');
      this.applyOnlineForm.controls.user_id.setValue(this.preSavedUserDetails.user_id||null);
      this.applyOnlineForm.controls.lead_user_id.setValue(this.preSavedUserDetails.user_id||null);      
      this.applyOnlineForm.controls.gender.setValue(this.preSavedUserDetails.gender||'Male');
      this.applyOnlineForm.controls.ssn.setValue(this.preSavedUserDetails.ssn||'');
      this.applyOnlineForm.controls.phone.setValue(this.preSavedUserDetails.phone_no||'');
      this.applyOnlineForm.controls.drive_license_number.setValue(this.preSavedUserDetails.drivers_license_number||'');
      this.applyOnlineForm.controls.email.setValue(this.preSavedUserDetails.email||'');
      this.applyOnlineForm.controls.suffix.setValue(this.preSavedUserDetails.suffix||'');
      this.applyOnlineForm.controls.dob.setValue(this.preSavedUserDetails.dob||'');
      this.applyOnlineForm.controls.current_address.setValue(this.preSavedUserDetails.current_address||'');
      this.applyOnlineForm.controls.current_city.setValue(this.preSavedUserDetails.current_city||'');
      this.applyOnlineForm.controls.current_state.setValue(this.preSavedUserDetails.current_state||'');
      this.applyOnlineForm.controls.current_zip_code.setValue(this.preSavedUserDetails.current_zip_code||'');
      this.applyOnlineForm.controls.current_address_type.setValue(this.preSavedUserDetails.address_type||'');
      this.applyOnlineForm.controls.current_length_at_address.setValue(this.preSavedUserDetails.length_of_current_address||'');
      this.applyOnlineForm.controls.empName.setValue(this.preSavedUserDetails.employer_name||'');
      this.applyOnlineForm.controls.empPhone.setValue(this.preSavedUserDetails.employer_phone||'');
      this.applyOnlineForm.controls.empLengthOfJob.setValue(this.preSavedUserDetails.time_at_job||'');
      this.applyOnlineForm.controls.empIncomeType.setValue(this.preSavedUserDetails.income_type||this.incomeTypes[0]);
      this.applyOnlineForm.controls.empIncomeInterVal.setValue(this.preSavedUserDetails.income_interval||this.incomeIntervals[0]);
      this.applyOnlineForm.controls.empStatus.setValue(this.preSavedUserDetails.status||this.statusTypes[0]);
      this.applyOnlineForm.controls.empAmount.setValue(this.preSavedUserDetails.amount||'');
    }
  }

  onSubmitApplyOnlineForm() {
    if (this.applyOnlineForm.invalid) {
      Object.keys(this.applyOnlineForm.controls).forEach(field => {
        const control = this.applyOnlineForm.get(field);
        control?.markAsTouched({onlySelf: true});
      });
      return
    }
    // check if user is logged in or not
    if (this.checkAuthService.IsLogin() == false) {
      this.toggleSettings.showApplyOnlineForm = false;
      this.toggleSettings.showSignupForm = true;
      this.signupForm.controls.email.setValue(this.applyOnlineForm.controls.email.value)
      this.signupForm.controls.first_name.setValue(this.applyOnlineForm.controls.first_name.value)
      this.signupForm.controls.last_name.setValue(this.applyOnlineForm.controls.last_name.value)
      this.signupForm.controls.phone.setValue(this.applyOnlineForm.controls.phone.value);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      return
    } else {
      this.accepTermsAndConditions();
    }
  }

  accepTermsAndConditions() {
    const config: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
    };
    this.modalService.open(this.termsAndConditionModal, config);
  }

  applyOnline() {
    this.applyOnlineForm.controls.lead_state.setValue(this.applyOnlineForm.controls.lead_state.value);
    this.applyOnlineForm.controls.down_payment.setValue(this.applyOnlineForm.controls.down_payment.value ? this.applyOnlineForm.controls.down_payment.value.toString() : this.applyOnlineForm.controls.down_payment.value)
    this.showLoader = true;
    if (this.applyOnlineForm.controls.phone.value != null) {
      let formattedNumber = this.applyOnlineForm.controls.phone.value.replace(/[^a-zA-Z0-9]/g, '');
      formattedNumber = formattedNumber.substring(0, 10)
      this.applyOnlineForm.controls.phone.setValue(1 + formattedNumber)
    }
    if (this.applyOnlineForm.controls.empPhone.value != null) {
      let formattedNumber = this.applyOnlineForm.controls.empPhone.value.replace(/[^a-zA-Z0-9]/g, '');
      formattedNumber = formattedNumber.substring(0, 10)
      this.applyOnlineForm.controls.empPhone.setValue(1 + formattedNumber)
    }
    if (this.coSignerFormValues == undefined) {
      this.applyOnlineForm.controls.user_id.reset()
    }
    this.backendService.applyOnline(this.applyOnlineForm.value).subscribe((applyOnlineResp: any) => {
      if (applyOnlineResp && applyOnlineResp.status == 201) {
        sessionStorage.removeItem('CID');
        if(this.saveInfoWhileApplying==true){
          this.updateUserProfile(applyOnlineResp)
        } else {
          if (this.coSignerFormValues != undefined) {
            this.submitCoSignerForm(applyOnlineResp);
          } else {
            this.submitEmployementDetailsForm(applyOnlineResp)
          }
        }
      } else {
        this.signupForm.setErrors({'Invalid': applyOnlineResp?.body?.message})
      }
    })
  }

  updateUserProfile(applyOnlineResp: any){
    const content_ = new FormData();
    content_.append('user_id', this.applyOnlineForm.controls.lead_user_id.value||'');
    content_.append('firstname', this.applyOnlineForm.controls.first_name.value||'');
    content_.append('middlename', this.applyOnlineForm.controls.middle_name.value||'');
    content_.append('lastname', this.applyOnlineForm.controls.last_name.value||'');
    content_.append('gender', this.applyOnlineForm.controls.gender.value||'');
    content_.append('avatar_base_url', this.preSavedUserDetails?.avatar_base_url||'');
    content_.append('locale', 'en-US');
    content_.append('ssn', this.applyOnlineForm.controls.ssn.value||'');
    content_.append('phone_no', this.applyOnlineForm.controls.phone.value||'');
    content_.append('drivers_license_number', this.applyOnlineForm.controls.drive_license_number.value||'');
    content_.append('email', this.applyOnlineForm.controls.email.value||'');
    content_.append('suffix', this.applyOnlineForm.controls.suffix.value||'');
    content_.append('dob', this.applyOnlineForm.controls.dob.value||'');
    content_.append('current_address', this.applyOnlineForm.controls.current_address.value||'');
    content_.append('current_city', this.applyOnlineForm.controls.current_city.value||'');
    content_.append('current_state', this.applyOnlineForm.controls.current_state.value||'');
    content_.append('current_zip_code', this.applyOnlineForm.controls.current_zip_code.value||'');
    content_.append('address_type', this.applyOnlineForm.controls.current_address_type.value||'');
    content_.append('length_of_current_address', this.applyOnlineForm.controls.current_length_at_address.value||'');
    content_.append('employer_name', this.applyOnlineForm.controls.empName.value||'');
    content_.append('employer_phone', this.applyOnlineForm.controls.empPhone.value||'');
    content_.append('time_at_job', this.applyOnlineForm.controls.empLengthOfJob.value||'');
    content_.append('income_type', this.applyOnlineForm.controls.empIncomeType.value||'');
    content_.append('income_interval', this.applyOnlineForm.controls.empIncomeInterVal.value||'');
    content_.append('status', this.applyOnlineForm.controls.empStatus.value||'');
    content_.append('amount', this.applyOnlineForm.controls.empAmount.value||'');
    this.backendService.updateUserProfile(content_, this.applyOnlineForm.controls.lead_user_id.value||0).subscribe((response: any) => {
      if (response && response.status == 200) {
        if (this.coSignerFormValues != undefined) {
          this.submitCoSignerForm(applyOnlineResp);
        } else {
          this.submitEmployementDetailsForm(applyOnlineResp)
          // if (this.UID != undefined) {
          //   this.completeAccountInvitationLead(response);
          // } else {
          //   this.submitEmployementDetailsForm(response)
          // }
        }
      }
    });
    
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
    if (this.checkAuthService.IsLogin() == true) {
      this.applyOnline()
    } else {
      this.onSubmitSignupForm()
    }
  }

  submitEmployementDetailsForm(applyOnlineResp: any) {
    let employmentDetailsForm = [
      {
        "name": this.applyOnlineForm.controls.empName.value,
        "phone": this.applyOnlineForm.controls.empPhone.value,
        "amount": this.applyOnlineForm.controls.empAmount.value ? this.applyOnlineForm.controls.empAmount.value.toString() : this.applyOnlineForm.controls.empAmount.value,
        "income_type": this.applyOnlineForm.controls.empIncomeType.value,
        "status": this.applyOnlineForm.controls.empStatus.value,
        "length_of_job": this.applyOnlineForm.controls.empLengthOfJob.value,
        "income_interval": this.applyOnlineForm.controls.empIncomeInterVal.value,
        "current": 0
      }];
    this.showLoader = true;
    this.backendService.submitEmployementDetailsForm(employmentDetailsForm, applyOnlineResp.body.id).subscribe((response: any) => {
      this.showLoader = false;
      if (response && response.status == 200) {
        if (this.UID != undefined) {
          this.completeAccountInvitationLead(applyOnlineResp);
        } else {
          this.leadHasBeenCreated(applyOnlineResp)
        }
      }
    })
  }

  // Co Signup section
  coSignerFlag: any = false;
  coSignerFormValues: any = undefined;

  changeVal(event: any) {
    this.coSignerFlag = event.target.checked;
  }

  getCoSignerForm(event: any) {
    event.coSignerForm.vehicle_id = this.vehicleUserApplyingFor != null ? this.vehicleUserApplyingFor.id : null;
    this.coSignerFormValues = event.coSignerForm;
    this.saveInfoWhileApplying = event.saveInfoWhileApplying
    this.onSubmitApplyOnlineForm();
  }

  submitCoSignerForm(applyOnlineResp: any) {
    this.coSignerFormValues.user_id = this.applyOnlineForm.controls.user_id.value;
    this.coSignerFormValues.lead_id = applyOnlineResp.body.id;
    this.showLoader = true;
    this.backendService.submitCoSignerForm(this.coSignerFormValues).subscribe((response: any) => {
      this.showLoader = false;
      if (response && response.status == 201) {
        this.submitEmployementDetailsForm(applyOnlineResp)
        // if (this.UID != undefined) {
        //   this.completeAccountInvitationLead(response);
        // } else {
        //   this.makeNewLeadAlert(response)
        // }
      }
    })
  }

  // sign up section
  passVisibility: any;
  confirmPassVisibility: any;

  public signupForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[a-z A-Z 0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z A-Z]{2,4}$")])),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.compose([Validators.required])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)])),
    phone: new FormControl('', Validators.compose([Validators.required])),
    confirmPassword: new FormControl('', Validators.compose([Validators.required])),
  });

  get email() {
    return this.signupForm.get('email');
  }

  get first_name() {
    return this.signupForm.get('first_name');
  }

  get last_name() {
    return this.signupForm.get('last_name');
  }

  get phone_apply() {
    return this.signupForm.get('phone');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  togglePassVisibility() {

    let x: any = document.getElementById("passInput");
    if (x.type === "password") {
      x.type = "text";
      this.passVisibility = true;

    } else {
      x.type = "password";
      this.passVisibility = false;
    }

  }

  toggleConfirmPassVisibility() {

    let x: any = document.getElementById("confirmPassInput");
    if (x.type === "password") {
      x.type = "text";
      this.confirmPassVisibility = true;

    } else {
      x.type = "password";
      this.confirmPassVisibility = false;
    }

  }

  onSubmitSignupForm() {
    if (this.signupForm.invalid) {
      Object.keys(this.signupForm.controls).forEach(field => {
        const control = this.signupForm.get(field);
        control?.markAsTouched({onlySelf: true});
      });
      return
    }
    if (this.signupForm.valid) {
      if (this.signupForm.controls.password.value != this.signupForm.controls.confirmPassword.value) {
        this.signupForm.controls['confirmPassword'].reset;
        this.signupForm.controls['confirmPassword'].markAsTouched({onlySelf: true});
        this.signupForm.controls['confirmPassword'].setErrors({'error': 'Password and confirm password should be same'});
        return;
      }
      this.showLoader = true;
      if (this.signupForm.controls.phone.value != null) {
        let formattedNumber = this.signupForm.controls.phone.value.replace(/[^a-zA-Z0-9]/g, '');
        formattedNumber = formattedNumber.substring(0, 10)
        this.signupForm.controls.phone.setValue(1 + formattedNumber)
      }
      this.backendService.signup(this.signupForm.value).subscribe((response: any) => {
        this.showLoader = false;
        if (response && response.body.status == 201) {
          this.applyOnlineForm.controls.user_id.setValue(response.body.data.id);
          this.applyOnlineForm.controls.lead_user_id.setValue(response.body.data.id);
          localStorage.setItem('user', JSON.stringify(response.body.data));
          localStorage.setItem('token', response.body.data.token);
          this.applyOnline();
        } else {
          this.signupForm.setErrors({'Invalid': response?.body?.message})
        }
      })
    }
  }

  onFocusOutOfAddressInputField() {
    if (this.applyOnlineForm.controls.current_address.value == '' || this.applyOnlineForm.controls.current_address.value == null || this.applyOnlineForm.controls.current_address.value == undefined) {
      const control = this.applyOnlineForm.get('current_address');
      control?.markAsTouched({onlySelf: true});
      return
    }
  }

  getAddress(place: any) {
    this.applyOnlineForm.controls.current_address.setValue(place['formatted_address'])
    this.applyOnlineForm.controls.current_city.setValue(this.getCity(place));
    this.applyOnlineForm.controls.current_state.setValue(this.getState(place));
    this.applyOnlineForm.controls.current_zip_code.setValue(this.getPostCode(place));
    if (this.applyOnlineForm.controls.current_city.value == null || this.applyOnlineForm.controls.current_city.value == undefined || this.applyOnlineForm.controls.current_city.value == '') {
      this.applyOnlineForm.controls.current_city.enable()
    }
    if (this.applyOnlineForm.controls.current_state.value == null || this.applyOnlineForm.controls.current_state.value == undefined || this.applyOnlineForm.controls.current_state.value == '') {
      this.applyOnlineForm.controls.current_state.enable()
    }
    if (this.applyOnlineForm.controls.current_zip_code.value == null || this.applyOnlineForm.controls.current_zip_code.value == undefined || this.applyOnlineForm.controls.current_zip_code.value == '') {
      this.applyOnlineForm.controls.current_zip_code.enable()
    }
  }

  getAddrComponent(place: any, componentTemplate: any) {
    let result;

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }

  getCity(place: any) {
    const COMPONENT_TEMPLATE = {locality: 'long_name'},
      city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return city;
  }

  getState(place: any) {
    const COMPONENT_TEMPLATE = {administrative_area_level_1: 'short_name'},
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getPostCode(place: any) {
    const COMPONENT_TEMPLATE = {postal_code: 'long_name'},
      postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return postCode;
  }


  leadHasBeenCreated(response: any) {
    this.showLoader = false;
    this.toasterService.success("Your application has been submitted successfully.", '', {
      timeOut: 3000,
    });
    let queryParams: any = {
      'CID': 'true',
      'vehicle_id': this.applyOnlineForm.controls.vehicle_id.value ? this.applyOnlineForm.controls.vehicle_id.value : null
    }
    if (this.applyOnlineForm.controls.ad_id.value != '' || this.UID != undefined) {
      queryParams.CID = null;
      this.router.navigate(['/thank-you-for-applying/' + response.body.id], {queryParams: queryParams})
    } else {
      this.router.navigate(['/thank-you-for-applying/' + response.body.id], {queryParams: queryParams})
    }
  }

  // invitation portion starts
  checkIfInvitationHasExpired() {
    this.showLoader = true;
    this.backendService.getInvitationStatus(this.UID).subscribe({
      next: (response) => {
        if (response && response.status == 200) {
          if (response.body) {
            if (response.body.status == 404) {
              this.router.navigate(['/'])
            } else {
              this.applyOnlineForm.controls.email.setValue(response.body.email);
              this.applyOnlineForm.controls.dealership_id.setValue(JSON.parse(response.body.data).dealership_id);
              this.getDealerShipDataWithId(this.applyOnlineForm.controls.dealership_id.value)
            }
          }
        }
      },
      error: (error) => {
        this.toasterService.error(error.error.message, '', {
          timeOut: 3000,
        });
        this.router.navigate(['/'])
      }
    })
  }

  getDealerShipDataWithId(dealership_id: any) {
    this.backendService.getSpecificDealerShipWithId(dealership_id).subscribe((response: any) => {
      this.showLoader = false;
      if (response.status == 200 && response.body) {
        this.dealerShip = response.body;
        if (this.preSavedUserDetails) {
          this.applyOnlineForm.controls.first_name.setValue(this.preSavedUserDetails.firstname||'')   
          this.applyOnlineForm.controls.last_name.setValue(this.preSavedUserDetails.lastname||'')
          this.applyOnlineForm.controls.user_id.setValue(this.preSavedUserDetails.user_id);
          this.applyOnlineForm.controls.lead_user_id.setValue(this.preSavedUserDetails.user_id);
          
        }
      }
    });
  }

  completeAccountInvitationLead(resp: any) {
    this.backendService.completeAccountInvitationLead(this.UID).subscribe((response: any) => {
      this.showLoader = false;
      if (response && response.status == 200) {
        if (response.body.status == 200) {
          this.leadHasBeenCreated(resp);
        }
      }
    })
  }

  // invitation portion ends

  // makeNewLeadAlert(resp: any) {
  //   this.leadHasBeenCreated(resp)
  // this.backendService.makeNewLeadAlert(resp.body.id).subscribe({
  //   next: () => {this.leadHasBeenCreated(resp) },
  //   error: () => { this.leadHasBeenCreated(resp)},
  //   complete: () => { this.leadHasBeenCreated(resp)}
  // })
  // }

  preventDateInput(event: any){
    event.preventDefault()
  }


}
