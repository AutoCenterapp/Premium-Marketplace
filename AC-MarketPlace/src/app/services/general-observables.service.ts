import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralObservablesService {

  subscribeLoaderVal = new BehaviorSubject<any>(false);
  constructor() { }
  setLoaderVal(val: any) {
    this.subscribeLoaderVal.next(val);
  }

  getLoaderVal(): Observable<any> {
    return this.subscribeLoaderVal.asObservable();
  }
}
