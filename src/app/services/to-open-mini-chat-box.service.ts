import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToOpenMiniChatBoxService {

  subscribeMiniChatBoxVal = new BehaviorSubject<any>({openOrClose: 'close', dealerShipId: null});
  constructor() { }
  setMiniChatBoxVal(val: any) {
    this.subscribeMiniChatBoxVal.next({openOrClose: val.openOrClose, dealerShipId: val.dealerShipId});
  }

  getMiniChatBoxVal(): Observable<any> {
    return this.subscribeMiniChatBoxVal.asObservable();
  }
}
