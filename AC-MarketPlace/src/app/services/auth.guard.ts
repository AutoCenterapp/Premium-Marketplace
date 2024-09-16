import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router) { }
  canActivateChild(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  canActivate(): boolean {

    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  getAuthToken(): any {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token')
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      // let decode: any = jwtDecode(token);
      // if (Math.floor(new Date().getTime() / 1000) >= decode.exp) {
      //   localStorage.clear();
      //   return false;
      // }

      return true;
    }
    return false;
  }
}
