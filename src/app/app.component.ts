import { Component } from '@angular/core';
import { debounceTime, fromEvent, map, tap } from 'rxjs';
import { BackendService } from './services/backend.service';
import { CheckAuthService } from './services/check-auth.service';
import { GeneralLoaderComponent } from './shared/general-loader/general-loader.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showLoader: boolean = false;
  constructor(private checkAuthService: CheckAuthService, private backendService: BackendService) {
    if (environment.production) {
      let fbScript = document.createElement('script');
      fbScript.type = 'text/javascript';
      fbScript.innerHTML = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '3294236224175069');
fbq('track', 'PageView')`;
      document.body.appendChild(fbScript)


      let gtagScript = document.createElement('script');
      gtagScript.type = 'text/javascript';
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-GJPJ6NCTSZ'
      let gtagScript2 = document.createElement('script');
      gtagScript2.type = 'text/javascript';
      gtagScript2.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'G-GJPJ6NCTSZ');`
      document.body.appendChild(gtagScript2)
      document.body.appendChild(gtagScript)
    }
  }

  checkIfLogin() {
    return this.checkAuthService.IsLogin()
  }

  public generalLoaderComponent = GeneralLoaderComponent;
  title = 'autocenter';
  showScroll: boolean = true;

  showBtn$ = fromEvent(document, 'scroll').pipe(
    debounceTime(50),
    map(() => window.scrollY > 500),
    tap(() => console.log(''))
  );

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
