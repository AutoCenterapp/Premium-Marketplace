import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {BackendService} from 'src/app/services/backend.service';

@Component({
  selector: 'app-review-and-complete',
  templateUrl: './review-and-complete.component.html',
  styleUrls: ['./review-and-complete.component.css']
})
export class ReviewAndCompleteComponent implements OnInit {

  constructor(private backendService: BackendService, private route: ActivatedRoute, private toasterService: ToastrService) {
  }

  finalDocuments: any = [];
  uploadingDocument: any = false;
  documentToUpload: any = null;
  leadId: any = 1;
  lead: any = [];

  ngOnInit(): void {
    this.leadId = Number(this.route.snapshot.paramMap.get('id') || '');
    if (this.leadId != undefined && this.leadId != null) {
      this.getLead();
    }
  }

  getLead() {
    this.backendService.getLead(this.leadId).subscribe((response: any) => {
      if (response.status == 200 && response.body) {
        this.lead = response.body;
        this.getFinalDocuments()
      }
    });
  }

  getFinalDocuments() {
    this.backendService.getFinalAgreements().subscribe((response: any) => {
      if (response.status == 200 && response.body) {
        this.finalDocuments = response.body;
      }
    })
  }


  uploadFinalDocument(finalDocumentId: number) {
    if (this.documentToUpload == null) {
      return
    };
    this.uploadingDocument = true;
    this.backendService.uploadFinalAgreement(finalDocumentId, this.leadId, this.documentToUpload).subscribe((response: any) => {
      if (response.status == 200) {
        this.documentToUpload = null;
        this.toasterService.success('Your file has been uploaded successfully','', {
          timeOut: 3000,
        });
        this.uploadingDocument = false;
      }
    })
  }

  onDocumentSelection(event: any, finalDocument: any) {
    this.documentToUpload = null;
    let doc = event.target.files;
    this.documentToUpload = doc.item(0);
    finalDocument.document_type = this.documentToUpload.name
  }


  download(url: any) {
    let a: any = document.createElement("a");
    a.href = fetch(url).then((response) => {
      return response.blob();
    }).then(blob => {
      return URL.createObjectURL(blob);
    });
    a.download = "myImage.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

}
