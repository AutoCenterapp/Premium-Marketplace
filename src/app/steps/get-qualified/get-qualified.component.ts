import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-get-qualified',
  templateUrl: './get-qualified.component.html',
  styleUrls: ['./get-qualified.component.css']
})
export class GetQualifiedComponent implements OnInit {

  constructor(private backendService: BackendService, private router: Router, private route: ActivatedRoute, private toasterService: ToastrService) {
  }

  leadId: any = 1;
  lead: any = [];
  vehicle: any = [];
  requestedDocuments: any = [];
  documentsToUpload: any = [];

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
        if (response.body.hasOwnProperty('vehicle')) {
          this.vehicle = response.body.vehicle;
        } else {
          this.getVehicle(this.lead?.vehicle_id)
        }

        if (this.lead.lead_state == 'Qualified For Offer') {
          this.router.navigate(['/select-offer/' + this.leadId])
        }

        if (this.lead.lead_state != 'New') {
          this.getRequestedDocuments()
        }

      }
    });
  }

  getVehicle(vehicleId: any) {
    this.backendService.getVehicleThroughId(vehicleId).subscribe((response: any) => {
      if (response.status == 200 && response.body) {
        this.vehicle = response.body;
      }
    })
  }

  getRequestedDocuments() {
    this.backendService.getRequestedDocuments(this.leadId).subscribe((response: any) => {
      if (response.status == 200 && response.body) {
        this.requestedDocuments = response.body;
        const groupByKey = (list: any, key: any) => list.reduce((hash: any, obj: any) => ({ ...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj) }), {})
        this.requestedDocuments = groupByKey(this.requestedDocuments, 'title');
        this.requestedDocuments = Object.entries(this.requestedDocuments)
        console.log(this.requestedDocuments)
        // debugger
      }
    })
  }


  uploadRequestedDocument(requestedDocumentId: number, index: number) {
    this.toasterService.success("Uploading Document Please wait.");
    this.backendService.uploadRequestedDocument(this.leadId, requestedDocumentId, this.documentsToUpload[0].doc).subscribe((response: any) => {
      if (response.status == 200 && response.body) {
        var documentUploadResponse = response.body;

        this.backendService.getRequestedDocuments(this.leadId).subscribe((response: any) => {
          if (response.status == 200 && response.body) {
            let indexOfOpenedCard: any = this.requestedDocuments.findIndex((object: any) => {
                return object[1].show === true;
            });
            this.requestedDocuments = response.body;
            const groupByKey = (list: any, key: any) => list.reduce((hash: any, obj: any) => ({ ...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj) }), {})
            this.requestedDocuments = groupByKey(this.requestedDocuments, 'title');
            this.requestedDocuments = Object.entries(this.requestedDocuments);
            this.requestedDocuments.forEach((element: any, index: number) => {
              if(index == indexOfOpenedCard){
                element[1].show = true;
              }
            });
            if (documentUploadResponse['TotalLead'] * 1 == documentUploadResponse['total_uploaded'] * 1) {
              // location.reload();
            }
          }
        })

      }
    })
  }

  async onDocumentSelection(event: any, requestedDocumentId: number, title: string, index: number) {
    let doc = event.target.files;
    const content: any = {
      doc: doc.item(0),
      title: title
    }
    this.documentsToUpload.push(content);
    await this.uploadRequestedDocument(requestedDocumentId, index)
  }

  removeDocument(index: number) {
    this.documentsToUpload.splice(index, 1)
  }

  goToLink(document: any) {
    if (document && document?.document_path) {
      window.open(document?.document_path, "_blank");
    }
  }

}
