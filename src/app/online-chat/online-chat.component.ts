import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-online-chat',
  templateUrl: './online-chat.component.html',
  styleUrls: ['./online-chat.component.css']
})
export class OnlineChatComponent implements OnInit {
  
  @Input() public iframeUrl: any;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.modalService.dismissAll();
  }

}
