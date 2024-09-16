import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  @ViewChild("comingSoonModal", {static: true}) comingSoonModal: ElementRef | undefined;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  

  openComingSoonModal() {
    this.modalService.open(this.comingSoonModal);
  }
}
