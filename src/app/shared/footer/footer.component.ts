import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  loadingData: boolean = false;

  constructor(private backendService: BackendService, private toasterService: ToastrService) {


  }

  ngOnInit(): void {

  }

  public addNewsLetterForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[a-z A-Z 0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z A-Z]{2,4}$")])),
  })

  get email() {
    return this.addNewsLetterForm.get('email');
  }

  onSubmitForm(){
    if (this.addNewsLetterForm.invalid) {
      Object.keys(this.addNewsLetterForm.controls).forEach(field => {
        const control = this.addNewsLetterForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    } else {
      this.loadingData = true;
      this.backendService.addNewsLetterEMail(this.addNewsLetterForm.value).subscribe({
        next: (response) => {
          this.loadingData = false;
          this.toasterService.success("Your have successfully subscribed to newsletter.", '', {
            timeOut: 3000,
          });
          this.addNewsLetterForm.reset()
        },
        error: (error) => {
          this.addNewsLetterForm.controls.email.setErrors({ 'error': error?.message } );
          this.loadingData = false;
          this.addNewsLetterForm.reset()
        },
        complete: () => {}
      })
    }
  }

}
