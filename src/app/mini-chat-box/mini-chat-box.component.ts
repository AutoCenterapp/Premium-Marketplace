import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckAuthService } from '../services/check-auth.service';
import {environment} from "../../environments/environment";
import { ToOpenMiniChatBoxService } from '../services/to-open-mini-chat-box.service';

@Component({
  selector: 'app-mini-chat-box',
  templateUrl: './mini-chat-box.component.html',
  styleUrls: ['./mini-chat-box.component.css']
})
export class MiniChatBoxComponent implements OnInit {

  userDetails: any = '';
  iframeUrl: any;
  openOrClose: any = false;
  private chatUrl: string = environment.chatUrl;
  constructor(private checkAuthService: CheckAuthService, private miniChatBoxService: ToOpenMiniChatBoxService) {
    this.userDetails = this.checkAuthService.getUserDetails();
    this.miniChatBoxService.getMiniChatBoxVal().subscribe((val: any) => {
      if(val && val?.openOrClose){
        this.openOrClose = val.openOrClose=='close'?false:true;
      }
      if(val && (val?.dealerShipId!=undefined && val?.dealerShipId!=null)){
        this.iframeUrl = this.chatUrl + 'launch_chat/' + val.dealerShipId + '/' + (JSON.parse(this.userDetails)).token;
      } else{
        this.iframeUrl = this.chatUrl+'launch/' + (JSON.parse(this.userDetails)).token;
      }      
    })
  }

  ngOnInit(): void {    
  }

}
