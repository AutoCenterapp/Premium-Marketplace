import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  loadingData: boolean = false;
  visibility: any;
  public requestEmailTokenForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[a-z A-Z 0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z A-Z]{2,4}$")])),
  })
  constructor(private backendService: BackendService, private toasterService: ToastrService ) { }

  ngOnInit(): void {
  }

  get email() {
    return this.requestEmailTokenForm.get('email');
  } 

  requestEmailToken(){
    if (this.requestEmailTokenForm.invalid) {
      this.requestEmailTokenForm.controls.email.markAsTouched();
    } else {
      this.loadingData = true;
      this.backendService.requestEmailToken(this.requestEmailTokenForm.value.email).subscribe({
        next: (response) => {
          this.loadingData = false;
          this.toasterService.success("A link to reset your password has been sent to your email. Please check your inbox.", '', {
            timeOut: 6000,
          });
        },
        error: (error) => {
          this.requestEmailTokenForm.controls.email.setErrors({ 'error': error?.message } );
          this.loadingData = false;
        },
        complete: () => {}
      })
    }
  }

}
