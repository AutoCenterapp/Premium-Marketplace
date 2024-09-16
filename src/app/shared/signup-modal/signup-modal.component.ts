import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BackendService} from 'src/app/services/backend.service';
import {CheckAuthService} from 'src/app/services/check-auth.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {

  showLoader: any = false;
  @Output() valueFromModal: EventEmitter<any> = new EventEmitter();

  constructor(private titleService: Title, public activeModal: NgbActiveModal, private backendService: BackendService, private checkAuthService: CheckAuthService, private router: Router) {
  }

  passVisibility: any;
  confirmPassVisibility: any;

  public signupForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[a-z A-Z 0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z A-Z]{2,4}$")])),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.compose([Validators.required])),
    phone: new FormControl('', Validators.required),
    password: new FormControl('random-pass'),
    confirmPassword: new FormControl('random-pass'),
  });

  ngOnInit(): void {
    this.titleService.setTitle('Auto Center - Sign Up')
  }

  get email() {
    return this.signupForm.get('email');
  }

  get phone() {
    return this.signupForm.get('phone');
  }

  get first_name() {
    return this.signupForm.get('first_name');
  }

  get last_name() {
    return this.signupForm.get('last_name');
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      Object.keys(this.signupForm.controls).forEach(field => {
        const control = this.signupForm.get(field);
        control?.markAsTouched({onlySelf: true});
      });
    } else {
      this.showLoader = true;
      if (this.signupForm.controls.phone.value != null) {
        let formattedNumber = this.signupForm.controls.phone.value.replace(/[^a-zA-Z0-9]/g, '');
        formattedNumber = formattedNumber.substring(0, 10)
        this.signupForm.controls.phone.setValue(1 + formattedNumber)
      }
      this.backendService.signup(this.signupForm.value).subscribe((response: any) => {
        this.showLoader = false;
        if (response && response.body.status == 201) {
          localStorage.setItem('user', JSON.stringify(response.body.data));
          localStorage.setItem('token', response.body.data.token);
          this.valueFromModal.emit(response);
        } else {
          this.signupForm.setErrors({'Invalid': response?.body?.message})
        }
      })
    }
  }

}
