import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {BackendService} from 'src/app/services/backend.service';
import {Location} from '@angular/common';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  showLoader: any = false;

  constructor(private titleService: Title, private backendService: BackendService,
              private location: Location,
              private router: Router,
              private toasterService: ToastrService) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  visibility: any;
  userPhone : any;
  timeLeft: any = 60;
   code: any  = document.getElementById("twoFA")as HTMLInputElement | null;
  resendCode: any  = document.getElementById("resend-code")as HTMLInputElement | null;

  public loginForm = new FormGroup({
    username: new FormControl('', {validators: Validators.compose([Validators.required, Validators.pattern("^[a-z A-Z 0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])}),
    password: new FormControl('', {validators: Validators.compose([Validators.required])})
  })

  ngOnInit(): void {
    this.titleService.setTitle('Auto Center - Sign In')
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.showLoader = true;

      this.backendService.authenticate(this.loginForm.value).subscribe({
        next: () => {
        },
        error: (error) => {
          if (error && error.status == 302 && error.error.data) {
            if(error.error.data.FA)
            {

              this.userPhone=error.error.data.phone;
              this.sendVerificationCode();
              this.showLoader = false;
            }
            else {
                  ///Checking Credentials
              localStorage.setItem('user', JSON.stringify(error.error.data));
              localStorage.setItem('token', error.error.data.token);
              this.toasterService.success(error.error.message, '', {
                timeOut: 3000,
              });
              this.location.back();
            }
          } else {
            this.showLoader = false;
            this.loginForm.setErrors({'Invalid': error?.error?.message})
          }
        },
        complete: () => {

        }
      })
    }
  }
  verifyAuthCode()
  {
   let code: any  = document.getElementById("twoFA")as HTMLInputElement | null;
    if(code?.value!="")
    {
      let queryParams: any = {
        'receiver': this.userPhone,
        'code':code?.value
      }
      this.backendService.verifyFACode(queryParams).subscribe((response: any) =>{
          if(response.body=='"true"')
          {
            this.showLoader=true;
            this.backendService.authenticate(this.loginForm.value).subscribe({
              next: () => {
              },
              error: (error) => {
                if (error && error.status == 302 && error.error.data) {
                  // @ts-ignore
                  document.getElementById("FA-close").click();
                  ///Checking Credentials
                  localStorage.setItem('user', JSON.stringify(error.error.data));
                  localStorage.setItem('token', error.error.data.token);
                  this.toasterService.success(error.error.message, '', {
                    timeOut: 3000,
                  });
                  this.location.back();
                } else {
                  this.showLoader = false;
                  this.loginForm.setErrors({'Invalid': error?.error?.message})
                }
              },
              complete: () => {
              }
            })
          }
        else {
          this.toasterService.error("Invalid Code. Please try again.");
            code.focus();
        }
      });
    }
    else {
      this.toasterService.error("Please enter the code.");
      code.focus();

    }

  }
  sendVerificationCode(){
    this.timeLeft=60;
    let code: any  = document.getElementById("twoFA")as HTMLInputElement | null;
    let FAbtn : any = document.getElementById('FA-btn');
    let queryParams: any = {
      'receiver': this.userPhone
    }
    this.backendService.sendVerificationCode(queryParams).subscribe((response: any) =>{
      if (response=="success") {
        FAbtn.click();
        this.startTimer();
        code.focus();
      }
      else {
        this.toasterService.error("Failed to send Code. Try again after 10 minutes.(Limit exceed)");
      }
    });

  }
  toggleVisibility() {

    let x: any = document.getElementById("passInput");
    if (x.type === "password") {
      x.type = "text";
      this.visibility = true;

    } else {
      x.type = "password";
      this.visibility = false;
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
