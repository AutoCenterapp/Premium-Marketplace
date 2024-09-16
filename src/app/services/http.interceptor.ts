import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse, HttpEventType
} from '@angular/common/http';
import {catchError, filter, Observable, Subject, tap, throwError} from 'rxjs';
import {AuthGuard} from './auth.guard';

@Injectable()
export class HttpInterceptorHeader implements HttpInterceptor {

  private activeCalls: Map<string, Subject<any>> = new Map();

  constructor(private authGuard: AuthGuard) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.url.includes('v1/vehicle/search?q')){
      if (this.activeCalls.has(request.url)) {
        const subject = this.activeCalls.get(request.url);
        // @ts-ignore
        return subject.asObservable();
      }
      this.activeCalls.set(request.url, new Subject<any>());
    } else {
      this.activeCalls.set(request.url, new Subject<any>());
    }

    const token = this.authGuard.getAuthToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer M6YtXCoTHrm5KUnVMlpz--nGrQsnalLxTFf8I0Ra'
        }
      });
    }
    return next.handle(request).pipe(
      filter(res => res.type === HttpEventType.Response),
      tap(res => {
        const subject = this.activeCalls.get(request.url);
        // @ts-ignore
        subject.next(res);
        // @ts-ignore
        subject.complete();
        if(!request.url.includes('get-user-profile')){
          this.activeCalls.delete(request.url);
        }
      })
    )
  }
}
