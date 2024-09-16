import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BackendService} from "../../services/backend.service";
import {CheckAuthService} from "../../services/check-auth.service";
import {ToastrService} from "ngx-toastr";
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {


  visibility: any;

  constructor(private backendService: BackendService,private router: Router, private checkAuthService: CheckAuthService, private toasterService: ToastrService) { }

  ngOnInit(): void {

  }

  public userPasswordForm = new FormGroup({
    user_id: new FormControl('', Validators.required),
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required),
  });
  get oldPassword() {
    return this.userPasswordForm.get('oldPassword');
  }
  get newPassword() {
    return this.userPasswordForm.get('newPassword');
  }
  get confirmPassword() {
    return this.userPasswordForm.get('confirmPassword');
  }
  changePassword(){

    if (this.oldPassword?.value=='' || this.newPassword?.value=='' || this.confirmPassword?.value == '') {
      this.toasterService.error('Please fill all the fields.');
      return ;
    }
    else if ( this.newPassword?.value!=this.confirmPassword?.value ) {
      this.toasterService.error("Password didn't match. Please try again.");
      return ;
    }
    else
    {
      let user: any = this.checkAuthService.getUserDetails();
      if (user) {
        user = JSON.parse(user)
      }
      this.backendService.updateUserPassword(this.userPasswordForm.value,  user?.id).subscribe((response: any) => {
        if (response && response.status == 200) {
          if(response.body=="success")
          {
            this.toasterService.success('Your password has been updated successfully.');
            setTimeout(() =>
              {
                this.router.navigate(['/profile']);
              },
              3000);

          }
         else {
            this.toasterService.error("Old Password is incorrect. Please try again.");
          }
        }

      });
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
