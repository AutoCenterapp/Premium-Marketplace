import {IfStmt, ThisReceiver} from '@angular/compiler';
import {Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnlineChatComponent } from 'src/app/online-chat/online-chat.component';
import { BackendService } from 'src/app/services/backend.service';
import {CheckAuthService} from 'src/app/services/check-auth.service';
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userDetails: any = '';
  userProfile: any='';
  profileLogo: any='/assets/images/auto-center-logo.png';
  private chatUrl: string = environment.chatUrl;

  constructor(private modalService: NgbModal,private backendService: BackendService,private checkAuthService: CheckAuthService) {
  }

  checkIfLogin(){
    return this.checkAuthService.IsLogin()
  }

  getUserName(){
    let user: any = this.checkAuthService.getUserDetails();
    user = JSON.parse(user)
    return user.name
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // openChatModal() {
  //   let iframeUrl = this.chatUrl + 'launch/' + this.userDetails.token;
  //   if (!this.modalService.hasOpenModals()) {
  //     const modalRef = this.modalService.open(OnlineChatComponent, { size: 'xl'});
  //     modalRef.componentInstance.iframeUrl = iframeUrl;
  //   }
  // }

  ngOnInit(): void {
    this.getUserDetails()
  }

  getUserDetails(){
    this.userDetails = this.checkAuthService.getUserDetails();
    if (this.userDetails && this.userDetails != '') {
      this.userDetails = JSON.parse(this.userDetails);
      this.backendService.getUserProfile(this.userDetails?.id).subscribe((response: any) => {
        if (response.status == 200 && response.body) {
          response.body = JSON.parse(response.body)
          if(response.body.user.avatar_path!='')
          {
            this.userProfile = response.body.user.avatar_path;
          }
          }
      });
    }
  }

}
