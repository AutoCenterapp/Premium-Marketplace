import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private backendService: BackendService, private router: Router) { }
  passVisibility: any;
  showLoader: any = false;
  confirmPassVisibility: any;

  public signupForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[a-z A-Z 0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z A-Z]{2,4}$")])),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.compose([Validators.required])),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)])),
    confirmPassword: new FormControl('', Validators.compose([Validators.required])),
  });
  ngOnInit(): void {
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

  onSubmit() {
    debugger
    if (this.signupForm.invalid) {
      Object.keys(this.signupForm.controls).forEach(field => {
        const control = this.signupForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }else {
      if (this.signupForm.controls.password.value != this.signupForm.controls.confirmPassword.value) {
        this.signupForm.controls['confirmPassword'].reset;
        this.signupForm.controls['confirmPassword'].markAsTouched({ onlySelf: true });
        this.signupForm.controls['confirmPassword'].setErrors({ 'error': 'Password and confirm password should be same' });
        return;
      }
      this.showLoader = true;
      if(this.signupForm.controls.phone.value!=null){
        let formattedNumber = this.signupForm.controls.phone.value.replace(/[^a-zA-Z0-9]/g, '');
        formattedNumber=formattedNumber.substring(0, 10)
        this.signupForm.controls.phone.setValue(1+formattedNumber)
      }
      this.backendService.signup(this.signupForm.value).subscribe((response: any) => {
        this.showLoader=false;
        if (response && response.body.status == 201) {
          localStorage.setItem('user', JSON.stringify(response.body.data));
          localStorage.setItem('token', response.body.data.token);
          this.router.navigate(['/'])
        } else {
          this.signupForm.setErrors({ 'Invalid': response?.body?.message })
        }
      })
    }
  }

}
