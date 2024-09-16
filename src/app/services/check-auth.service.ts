import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthService {

  token = localStorage.getItem('token');
  constructor() { }

  getUserDetails(){
    return localStorage.getItem('user')?localStorage.getItem('user'):'';
  }

  IsLogin(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }
}
