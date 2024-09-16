import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../services/backend.service';
import { CheckAuthService } from '../services/check-auth.service';
import { Title } from '@angular/platform-browser';
import {parse} from "@angular/compiler-cli/linker/babel/src/babel_core";
import * as intlTelInput from "intl-tel-input";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  showLoader: boolean = false;
  constructor(private titleService: Title, private backendService: BackendService, private checkAuthService: CheckAuthService, private toasterService: ToastrService) { }

  imageUrl: any = '/assets/images/auto-center-logo.png';
  fileToUpload: any = '/assets/images/auto-center-logo.png';
  ngOnInit(): void {
    const inputElement = document.getElementById("FAphone");
    if(inputElement)
    {
      intlTelInput(inputElement,{
        initialCountry:'US',
        separateDialCode:true,
        autoInsertDialCode: true,
        utilsScript:'https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js'
      })

    }
    this.titleService.setTitle('Auto Center - Profile')
    this.getUserProfile();
  }

  userProfile: any;
  incomeTypes = ['W2 Employee', 'Self Employed', 'Disability', 'Cash'];
  statusTypes = ['Full Time', 'Active Military', 'Contract', 'Not Applicable', 'Part Time', 'Retired', 'Seasonal', 'Self Employed', 'Temporary'];
  incomeIntervals = ['Monthly', 'Weekly', 'Biweekly', 'Semimonthly', 'Yearly']



  public userProfileForm = new FormGroup({
    user_id: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    middlename: new FormControl(''),
    lastname: new FormControl('', Validators.compose([Validators.required])),
    avatar_path: new FormControl(File, Validators.compose([Validators.required])),
    avatar_base_url: new FormControl(null),
    locale: new FormControl("en-US"),
    gender: new FormControl(''),
    ssn: new FormControl(''),
    phone_no: new FormControl(''),
    drivers_license_number: new FormControl(''),
    email: new FormControl(''),
    suffix: new FormControl(''),
    dob: new FormControl(''),
    current_address: new FormControl(''),
    current_city: new FormControl(''),
    current_state: new FormControl(''),
    current_zip_code: new FormControl(''),
    address_type: new FormControl(''),
    length_of_current_address: new FormControl(''),
    employer_name: new FormControl(''),
    employer_phone: new FormControl(''),
    time_at_job: new FormControl(''),
    income_type: new FormControl(''),
    income_interval: new FormControl(''),
    status: new FormControl(''),
    amount: new FormControl(''),
  });

  get firstname() {
    return this.userProfileForm.get('firstname');
  }

  get lastname() {
    return this.userProfileForm.get('lastname');
  }

  get gender() {
    return this.userProfileForm.get('gender');
  }

  getUserProfile() {
    let user: any = this.checkAuthService.getUserDetails();
    if (user != '') {
      user = JSON.parse(user)
      this.showLoader = true;
      this.backendService.getUserProfile(user?.id).subscribe((response: any) => {
        if (response.status == 200 && response.body) {
          this.showLoader = false;
          response.body = JSON.parse(response.body)
          this.userProfile = response.body.user;
          if(response.body.user.two_FA==1)
          {
            this.faFlag = true;
            let faCheckbox : any = document.getElementById('faFlag');
            faCheckbox.checked = true;

          }
          this.imageUrl = this.userProfile?.avatar_path;
          Object.keys(this.userProfileForm.controls).forEach(field => {
            const control = this.userProfileForm.get(field);
            control?.setValue(this.userProfile[field]||'');
          });
          this.userProfileForm.controls.gender.setValue(this.userProfile.gender || '0');
        }
      });
    }
  }

  updateUserProfile() {
    const content_ = new FormData();
    if (this.fileToUpload && this.fileToUpload.name) {
      content_.append("avatar_path", this.fileToUpload, this.fileToUpload.name);
    } else {
      content_.append("avatar_path", this.imageUrl);
    }
    content_.append('avatar_base_url', this.userProfileForm.controls.avatar_base_url.value || '');
    Object.keys(this.userProfileForm.controls).forEach(field => {
      const control: any = this.userProfileForm.get(field);
      content_.append(field, control.value||'')
    });
    this.showLoader = true;
    this.backendService.updateUserProfile(content_, this.userProfileForm.controls.user_id.value).subscribe((response: any) => {
      if (response && response.status == 200) {
        this.showLoader = false;
        this.toasterService.success('Your profile has been updated successfully.');
        this.getUserProfile()
      }
    });
  }

  uploadPicture(event: any) {
    this.fileToUpload = null;
    this.imageUrl = null;
    let doc = event.target.files;
    this.fileToUpload = doc.item(0);
    this.imageUrl = doc.item(0);
    var reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      if (Math.ceil((event.target.files[0].size / 1024) / 1024) > 3) {
        this.toasterService.error('File size is too big');
        return;
      }

      reader.readAsDataURL(event.target.files[0]);


      reader.onload = (target) => {
        this.imageUrl = target;
      }
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    }
  }

  preventDateInput(event: any){
    event.preventDefault()
  }

  onFocusOutOfAddressInputField() {
    if (this.userProfileForm.controls.current_address.value == '' || this.userProfileForm.controls.current_address.value == null || this.userProfileForm.controls.current_address.value == undefined) {
      const control = this.userProfileForm.get('current_address');
      control?.markAsTouched({onlySelf: true});
      return
    }
  }

  getAddress(place: any) {
    this.userProfileForm.controls.current_address.setValue(place['formatted_address'])
    this.userProfileForm.controls.current_city.setValue(this.getCity(place));
    this.userProfileForm.controls.current_state.setValue(this.getState(place));
    this.userProfileForm.controls.current_zip_code.setValue(this.getPostCode(place));
    if (this.userProfileForm.controls.current_city.value == null || this.userProfileForm.controls.current_city.value == undefined || this.userProfileForm.controls.current_city.value == '') {
      this.userProfileForm.controls.current_city.enable()
    }
    if (this.userProfileForm.controls.current_state.value == null || this.userProfileForm.controls.current_state.value == undefined || this.userProfileForm.controls.current_state.value == '') {
      this.userProfileForm.controls.current_state.enable()
    }
    if (this.userProfileForm.controls.current_zip_code.value == null || this.userProfileForm.controls.current_zip_code.value == undefined || this.userProfileForm.controls.current_zip_code.value == '') {
      this.userProfileForm.controls.current_zip_code.enable()
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
  faFlag: any = false;
  faPhone:any;
  changeVal(event: any) {
    let FAbtn : any = document.getElementById('FA-btn');
    let FAClose : any = document.getElementById('FA-close');
   if(event.target.checked)
   {
     this.faFlag = event.target.checked;
     FAbtn.click();

   }
   else {
     FAClose.click();
     this.disableFA();
   }
  }


  timeLeft: any = 60;
  code: any  = document.getElementById("FAcode")as HTMLInputElement | null;
  resendCode: any  = document.getElementById("resend-code")as HTMLInputElement | null;


  sendCode()
  {

    let FAPhone : any = document.getElementById('FAphone');
    var input = document.querySelector('#phone');
    var iti = window.intlTelInputGlobals.getInstance(FAPhone);
    var Phone=iti.getNumber();// etc

    this.faPhone= Phone;
    if(FAPhone?.value=="")
    {
      this.toasterService.error("Please Enter Phone Number and try again.");
      FAPhone?.focus();
    }
    let sendBtn : any = document.getElementById('continue-phone');
    let faCodeBody : any = document.getElementById('verify-body');
    this.timeLeft=60;
    let queryParams: any = {
      'receiver': this.faPhone
    }
    this.backendService.sendVerificationCode(queryParams).subscribe((response: any) =>{
      if (response=="success") {
        this.toasterService.success("Authentication Code has been sent to your mobile.");
          sendBtn.style.display = 'none';
          faCodeBody.style.display = 'block';
          this.startTimer();
          this.code?.focus();
        }
      else {
        this.toasterService.error("Failed to send code.Internal Server Error.");
        this.code?.focus();
      }
    });
  }

  editPhone()
  {
    let sendBtn : any = document.getElementById('continue-phone');
    let faCodeBody : any = document.getElementById('verify-body');
    faCodeBody.style.display='none';
    sendBtn.style.display='block';
    let FAPhone : any = document.getElementById('FAphone');
    FAPhone?.focus();
  }

  disableFA()
  {
    let user: any = this.checkAuthService.getUserDetails();
    user = JSON.parse(user);
    this.backendService.disableFA(user?.id).subscribe((response: any) => {
      //response = JSON.parse(response);

      if (response.status == "200") {
        this.toasterService.success(response.message);
      }
      else {
        this.toasterService.error(response.message);
      }
    });
  }

  enableFA()
  {
    let faCode:any = document.getElementById("FAcode");

    let queryParams: any = {
      'receiver': this.faPhone,
      'code':faCode?.value
    }
    if(faCode?.value!="")
    {
      this.backendService.verifyFACode(queryParams).subscribe((response: any) =>{
        if (response.body=='"true"') {
          let user: any = this.checkAuthService.getUserDetails();
          user = JSON.parse(user);
          this.backendService.enableFA(user?.id,this.faPhone).subscribe((response: any) =>{
            if(response.status=="200")
            {
              this.toasterService.success(response.message);
              faCode.value="";
              let faPhone : any = document.getElementById('FAphone');
              let sendBtn : any = document.getElementById('continue-phone');
              let faCodeBody : any = document.getElementById('verify-body');
              let FAClose : any = document.getElementById('FA-close');
              sendBtn.style.display = 'block';
              faCodeBody.style.display = 'none';
              FAClose.click();
              faPhone.value="";

            }
          });
        }
        else {
          this.toasterService.error("Invalid Code. Please try again.");
          faCode.focus();
        }
      });
    }
    else {
      this.toasterService.error("Please enter the code.");
      faCode.focus();

    }
  }

  startTimer() {
    setInterval(() => {
      if ( this.timeLeft> 0) {
        // @ts-ignore
        document.getElementById("timer").innerHTML=this.timeLeft+"s";
        this.timeLeft--;
      } else {
        // @ts-ignore
        document.getElementById("timer").innerHTML="";

      }
    }, 1000);
  }
}
