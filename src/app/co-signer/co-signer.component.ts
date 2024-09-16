import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-co-signer',
  templateUrl: './co-signer.component.html',
  styleUrls: ['./co-signer.component.css']
})
export class CoSignerComponent implements OnInit {

  constructor(private router: Router) {

  }
  incomeTypes = ['W2 Employee', 'Self Employed', 'Disability', 'Cash'];
  statusTypes = ['Full Time', 'Active Military', 'Contract', 'Not Applicable', 'Part Time', 'Retired', 'Seasonal', 'Self Employed', 'Temporary'];
  incomeIntervals = ['Weekly', 'Biweekly', 'Semimonthly', 'Monthly', 'Yearly']

  @Output() submitCoSignerForm = new EventEmitter();

  public coSignerForm = new FormGroup({
    ssn: new FormControl('', Validators.compose([Validators.required])),
    drive_license_number: new FormControl(''),
    phone: new FormControl('', Validators.compose([Validators.required])),
    current_address: new FormControl('', Validators.compose([Validators.required])),
    current_city: new FormControl('', Validators.compose([Validators.required])),
    current_state: new FormControl('', Validators.compose([Validators.required])),
    current_zip_code: new FormControl('', Validators.compose([Validators.required])),
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
    lead_id: new FormControl(''),

    // empName: new FormControl('', Validators.required),
    // empPhone: new FormControl(''),
    // empAmount: new FormControl(''),
    // empLengthOfJob: new FormControl('', Validators.required),
    // empIncomeType: new FormControl(this.incomeTypes[0]),
    // empStatus: new FormControl(this.statusTypes[0]),
    // empIncomeInterVal: new FormControl(this.incomeIntervals[0]),
  });

  get ssn() {
    return this.coSignerForm.get('ssn');
  }

  get phone() {
    return this.coSignerForm.get('phone');
  }

  get current_address() {
    return this.coSignerForm.get('current_address');
  }

  get current_city() {
    return this.coSignerForm.get('current_city');
  }

  get current_state() {
    return this.coSignerForm.get('current_state');
  }

  get current_zip_code() {
    return this.coSignerForm.get('current_zip_code');
  }

  get current_length_at_address() {
    return this.coSignerForm.get('current_length_at_address');
  }

  get current_address_type() {
    return this.coSignerForm.get('current_address_type');
  }


  get first_name() {
    return this.coSignerForm.get('first_name');
  }

  get last_name() {
    return this.coSignerForm.get('last_name');
  }

  get dob() {
    return this.coSignerForm.get('dob');
  }

  get suffix() {
    return this.coSignerForm.get('suffix');
  }

  get email() {
    return this.coSignerForm.get('email');
  }

  get gender() {
    return this.coSignerForm.get('gender');
  }

  get empName() {
    return this.coSignerForm.get('empName');
  }
  get empLengthOfJob() {
    return this.coSignerForm.get('empLengthOfJob');
  }

  get iframePAth()
  {
    if(this.router.url.indexOf("/apply-online-iframe/")== -1)
    {
      return true;
    }else {
      return  false
    }
  }

  ngOnInit(): void {
  }

  onSubmitCoSignerForm(saveInfoWhileApplying: any){
    if (this.coSignerForm.invalid) {
      Object.keys(this.coSignerForm.controls).forEach(field => {
        const control = this.coSignerForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return
    } else {
      if(this.coSignerForm.controls.phone.value!=null){
        let formattedNumber = this.coSignerForm.controls.phone.value.replace(/[^a-zA-Z0-9]/g, '');
        formattedNumber=formattedNumber.substring(0, 10)
        this.coSignerForm.controls.phone.setValue(1+formattedNumber)
      }
      this.submitCoSignerForm.emit({'coSignerForm':this.coSignerForm.value, 'saveInfoWhileApplying':saveInfoWhileApplying});
    }
  }

  onFocusOutOfAddressInputField(){
    if(this.coSignerForm.controls.current_address.value=='' || this.coSignerForm.controls.current_address.value==null || this.coSignerForm.controls.current_address.value==undefined){
        const control = this.coSignerForm.get('current_address');
        control?.markAsTouched({ onlySelf: true });
      return
    }
  }

  getAddress(place: any) {
    this.coSignerForm.controls.current_address.setValue(place['formatted_address'])
    this.coSignerForm.controls.current_city.setValue(this.getCity(place));
    this.coSignerForm.controls.current_state.setValue(this.getState(place));
    this.coSignerForm.controls.current_zip_code.setValue(this.getPostCode(place));
    if(this.coSignerForm.controls.current_city.value==null || this.coSignerForm.controls.current_city.value==undefined || this.coSignerForm.controls.current_city.value==''){
      this.coSignerForm.controls.current_city.enable()
    }
    if(this.coSignerForm.controls.current_state.value==null || this.coSignerForm.controls.current_state.value==undefined || this.coSignerForm.controls.current_state.value==''){
      this.coSignerForm.controls.current_state.enable()
    }
    if(this.coSignerForm.controls.current_zip_code.value==null || this.coSignerForm.controls.current_zip_code.value==undefined || this.coSignerForm.controls.current_zip_code.value==''){
      this.coSignerForm.controls.current_zip_code.enable()
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
    const COMPONENT_TEMPLATE = { locality: 'long_name' },
      city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return city;
  }

  getState(place: any) {
    const COMPONENT_TEMPLATE = { administrative_area_level_1: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getPostCode(place: any) {
    const COMPONENT_TEMPLATE = { postal_code: 'long_name' },
      postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return postCode;
  }

  preventDateInput(event: any){
    event.preventDefault()
  }

}
