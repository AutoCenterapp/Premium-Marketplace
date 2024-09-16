import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  loadingData: boolean = false;
  token: any;
  visibility: any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private backendService: BackendService, private toasterService: ToastrService ) {
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token');;
    debugger
   }

  public newPasswordForm = new FormGroup({
    newPassword: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required),
  })
  ngOnInit(): void {
  }

  get newPassword() {
    return this.newPasswordForm.get('newPassword');
  }
  get confirmPassword() {
    return this.newPasswordForm.get('confirmPassword');
  }  

  setNewPassword(){
    if (this.newPasswordForm.invalid) {
      Object.keys(this.newPasswordForm.controls).forEach(field => {
        const control = this.newPasswordForm.get(field);
        control?.markAsTouched({onlySelf: true});
      });
      return
    } else if ( this.newPasswordForm.controls.newPassword.value!=this.newPasswordForm.controls.confirmPassword.value ) {
      this.newPasswordForm.controls['confirmPassword'].setErrors({'error': 'Password and confirm password should be same'});
      return ;
    } else {
      this.loadingData = true;
      this.backendService.changePasswordWithEmailGeneratedToken(this.newPasswordForm.controls.newPassword.value, this.token).subscribe({
        next: (response) => {
          if(response.body.status==200){
            this.toasterService.success("Your password has been reset successfully. Please login tp continue!", '', {
              timeOut: 6000,
            });
            this.router.navigate(['/signin']);
          } else {
            this.newPasswordForm.setErrors({'Invalid': response?.body?.message})
          }
          this.loadingData = false;
        },
        error: (error) => {
          this.loadingData = false;
        },
        complete: () => {}
      })
    }
  }

  toggleVisibility(id: any) {

    let x: any = document.getElementById(id);
    if (x.type === "password") {
      x.type = "text";
      this.visibility = true;

    } else {
      x.type = "password";
      this.visibility = false;
    }

  }

}
