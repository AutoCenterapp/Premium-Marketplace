import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable, share, shareReplay, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {catchError, map, mergeMap as _observableMergeMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {CheckAuthService} from './check-auth.service';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private http: HttpClient;
  private baseUrl: string = environment.apiUrl;
  private documentUploadUrl: string = environment.documentUploadUrl;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(private checkAuthService: CheckAuthService, private router: Router, @Inject(HttpClient) http: HttpClient) {
    this.http = http;
    this.baseUrl = environment.apiUrl !== undefined && environment.apiUrl !== null ? environment.apiUrl : "";
  }

  getVehicles(pageSize?: number, pageNumber?: number, filter?: any): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicles?${filter}&expand=images,vehicleMake,vehicleModel,dealership&per-page=${pageSize}&page=${pageNumber}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }
  getAllVehicles(filter?: any): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicles?${filter}&per-page=5`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }
  getVehiclesAgainstSelectedKeywordApply(filter?: any): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicles?${filter}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }
  getDealershipId(Uid?: any): Observable<any> {
    let url_ = this.baseUrl + `v1/dealership/get-dealer-inventory?UID=${Uid}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getVehiclesAgainstQuery(query: string, pageSize?: number, pageNumber?: number): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicle/sort?q=${query}&per-page=${pageSize}&page=${pageNumber}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getVehiclesAgainstModel(pageSize?: number, pageNumber?: number, modelId?: number): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicles?&expand=images,vehicleMake,vehicleModel,dealership&per-page=${pageSize}&page=${pageNumber}&filter[model]=${modelId}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }
  getDealerVehiclesAgainstModel(pageSize?: number, pageNumber?: number, modelId?: number,filter?: any): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicles?${filter}&expand=images,vehicleMake,vehicleModel,dealership&per-page=${pageSize}&page=${pageNumber}&filter[model]=${modelId}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getVehiclesAgainstSelectedVehicleType(pageSize?: number, pageNumber?: number, filter?: any): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicles?filter[vehicle_type]=${filter}&expand=images,vehicleMake,vehicleModel,dealership&per-page=${pageSize}&page=${pageNumber}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }
  getDealerVehiclesAgainstSelectedVehicleType(pageSize?: number, pageNumber?: number, type?: any,dealerId?:any): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicles?filter[vehicle_type]=${type}&filter[dealership_id]=${dealerId}&expand=images,vehicleMake,vehicleModel,dealership&per-page=${pageSize}&page=${pageNumber}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getVehiclesAgainstSelectedKeyword(pageSize?: number, pageNumber?: number, filter?: any): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicles?filter[title][like]=${filter}&expand=images,vehicleMake,vehicleModel,dealership&per-page=${pageSize}&page=${pageNumber}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getDealerVehiclesAgainstSelectedKeyword(pageSize?: number, pageNumber?: number, title?: any,dealerId?:any): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicles?filter[title][like]=${title}&filter[dealership_id]=${dealerId}&expand=images,vehicleMake,vehicleModel,dealership&per-page=${pageSize}&page=${pageNumber}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getSortedVehicles(sort?: string, pageSize?: number, pageNumber?: number): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicle/get-vehicles?q=${sort}&per-page=${pageSize}&page=${pageNumber}&expand=dealership`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getSavedVehicles(userId?: string, pageNumber?: number): Observable<any> {
    let url_ = this.baseUrl + `v1/saved-vehicles?filter[user_id]=${userId}&expand=vehicle.vehicleModel,vehicle.dealership,vehicle.vehicleMake,vehicle.images&per-page=${pageNumber}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  isVehicleSaved(userId?: string, vehicle_id?: string): Observable<any> {
    let url_ = this.baseUrl + `v1/saved-vehicles?filter[user_id]=${userId}&filter[vehicle_id]=${vehicle_id}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  addSavedVehicles(body: any): Observable<any> {
    let url_ = this.baseUrl + `v1/saved-vehicles`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, body, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      }), share());
  }

  removeSavedVehicles(vehicle_id?: string): Observable<any> {
    let url_ = this.baseUrl + `v1/saved-vehicles/${vehicle_id}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.delete(url_).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getTestimonials(): Observable<any> {
    let url_ = this.baseUrl + "v1/testimonials";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getDealerShips(pageSize?: number, pageNumber?: number ,zipCode?: any): Observable<any> {
    let url_ : any
    if(zipCode!=null){
      url_ = this.baseUrl + `v1/dealership?expand=bannerCars.vehicleModel,bannerCars.vehicleMake,bannerCars.images&filter[is_enabled]=1&zipcode=${zipCode}&sort=distance&per-page=${pageSize}&page=${pageNumber}`;
    } else {
      url_ = this.baseUrl + `v1/dealership?expand=bannerCars.vehicleModel,bannerCars.vehicleMake,bannerCars.images&filter[is_enabled]=1&per-page=${pageSize}&page=${pageNumber}`;
    }
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getDealerShipsAgainstQuery(pageSize?: number, pageNumber?: number ,zipCode?: any, query?: any): Observable<any> {
    let url_ : any
    if(zipCode!=null){
      url_ = this.baseUrl + `v1/dealership?expand=bannerCars.vehicleModel,bannerCars.vehicleMake,bannerCars.images&filter[business_name][like]=${query}&[is_enabled]=1&zipcode=${zipCode}&sort=distance&per-page=${pageSize}&page=${pageNumber}`;
    } else {
      url_ = this.baseUrl + `v1/dealership?expand=bannerCars.vehicleModel,bannerCars.vehicleMake,bannerCars.images&filter[business_name][like]=${query}&[is_enabled]=1&per-page=${pageSize}&page=${pageNumber}`;
    }
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getSpecificDealerShip(dealershipSlug: number): Observable<any> {
    let url_ = this.baseUrl + `v1/dealerships?filter[slug]=${dealershipSlug}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getSpecificDealerShipWithId(dealerShipId: number): Observable<any> {
    let url_ = this.baseUrl + `v1/dealerships/${dealerShipId}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getDealerShipCars(dealerShipId: number): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicles?filter[dealership_id]=${dealerShipId}&expand=vehicleMake,vehicleModel,images`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getVehicleThroughSlug(slug: number): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicles?filter[slug]=${slug}&expand=dealership,vehicleMake,vehicleModel,images,saveCount,viewCount,vehicleColor,vehicleDriveType,vehicleType`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getVehicleThroughId(vehicleId: number): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicles/${vehicleId}?expand=dealership,vehicleMake,vehicleModel,images,saveCount,viewCount,vehicleColor,vehicleDriveType,vehicleType`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getLead(leadId: number): Observable<any> {
    let url_ = this.baseUrl + `v1/leads/${leadId}?expand=vehicle.images,vehicle.vehicleMake,vehicle.dealership,vehicle.vehicleModel,vehicle.vehicleType,vehicle.vehicleColor,vehicle.vehicleDriveType,vehicle.saveCount,vehicle.viewCount`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getRequestedDocuments(leadId: number): Observable<any> {
    let url_ = this.baseUrl + `v1/lead-document?filter[lead_id]=${leadId}&expand=lead`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }


  uploadRequestedDocument(leadId: number, doc_id: number, requestedDocument: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('document_path', requestedDocument, requestedDocument.name);
    let url_ = this.documentUploadUrl + `upload?id=${doc_id}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, formData, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getLeadOffers(leadId: number): Observable<any> {
    let url_ = this.baseUrl + `v1/lead-terms?filter[lead_id]=${leadId}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  postSelectedOffer(leadId: number, selectedOfferId: number): Observable<any> {
    let url_ = this.baseUrl + `v1/lead-term/selected-offer?lead_id=${leadId}&term_id=${selectedOfferId}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getFinalAgreements(): Observable<any> {
    let url_ = this.baseUrl + `v1/lead-final-agreement/`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  uploadFinalAgreement(docId: number, leadId: number, requestedDocument: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('document_path', requestedDocument, requestedDocument.name);
    let url_ = this.baseUrl + `v1/lead-signed-agreement/sign?lead_id=${leadId}&final_doc_id=${docId}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, formData, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  searchVehicle(searchedText: string): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicle/search?q=${searchedText}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  searchVehiclesAgainstZipCode(payLoad: any, pageNumber?: any): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicle/get-vehicles-using-zip-code?zip_code=${payLoad.zip_code}&radius=${payLoad.radius}&per-page=15&page=${pageNumber || 1}`;
    // let url_ = this.baseUrl + `v1/vehicle/get-vehicles-using-zip-code?zip_code=75041&radius=50&per-page=15&page=${pageNumber || 1}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getVehicleView(userIp: string, vehicleID: number): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicle-views?filter[vehicle_id]=${vehicleID}&filter[user_ip]=${userIp}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  addVehicleView(body: any): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicle-views`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, body, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  advancedSearch(filters: any, pageNumber?: number): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicles?${filters}&expand=images,vehicleMake,vehicleModel,dealership&per-page=12&page=${pageNumber || 1}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  dealerAdvancedSearch(filters: any, pageNumber?: number,dealerId?:any): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicles?${filters}&filter[dealership_id]=${dealerId}&expand=images,vehicleMake,vehicleModel,dealership&per-page=12&page=${pageNumber || 1}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  DealeradvancedSearch(filters: any, pageNumber?: number, dealerID?: any): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicles?${filters}&filter[dealership_id]=${dealerID}&expand=images,vehicleMake,vehicleModel,dealership&per-page=12&page=${pageNumber || 1}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  applyOnline(body: any): Observable<any> {
    let url_ = this.baseUrl + "v1/leads";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, body, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  submitCoSignerForm(body: any): Observable<any> {
    let url_ = this.baseUrl + "v1/co-signers";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, body, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  submitEmployementDetailsForm(body: any, leadId: any): Observable<any> {
    let url_ = this.baseUrl + `v1/lead-user-employment/add?id=${leadId}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, body, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getMyOffers(userId: any): Observable<any> {
    let url_ = this.baseUrl + `v1/lead?filter[lead_user_id]=${userId}&expand=vehicle.images,vehicle.dealership,dealership,vehicle.vehicleMake,vehicle.dealership,vehicle.vehicleModel`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getMakes(): Observable<any> {
    let url_ = this.baseUrl + 'v1/makes';
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getColors(): Observable<any> {
    let url_ = this.baseUrl + 'v1/colors';
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getBodyStyles(): Observable<any> {
    let url_ = this.baseUrl + 'v1/vehicle/vehicle-types';
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getModels(makeId: Number): Observable<any> {
    let url_ = this.baseUrl + `v1/models?filter[make_id]=${makeId}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  authenticate(body: any): Observable<any> {
    let url_ = this.baseUrl + "v1/user/login";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, body, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }


  getUserProfile(userId: number): Observable<any> {
    let url_ = this.baseUrl + `v1/user-profile/get-user-profile?user_id=${userId}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {responseType: 'text', observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }
  sendVerificationCode(body: any): Observable<any> {
    let url_ = this.baseUrl + `v1/user/send-verification-code`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, body,{responseType: 'text', observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }
  verifyFACode(body:any): Observable<any> {
    let url_ = this.baseUrl + `v1/user/check-verification-code`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, body, {responseType: 'text', observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }
  enableFA(id:number,phone: string): Observable<any> {
    let url_ = this.baseUrl + `v1/user/enable-authentication?id=${id}&phone=${phone}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, {responseType: 'text', observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }
  disableFA(id:number): Observable<any> {
    let url_ = this.baseUrl + `v1/user/disable-authentication?id=${id}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, {responseType: 'text', observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  updateUserProfile(content_: any, userId: any): Observable<any> {
    let url_ = this.baseUrl + `v1/user-profile/update-profile?user_id=${userId}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, content_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  updateUserPassword(body: any, userId: number): Observable<any> {
    const content_ = new FormData();
    content_.append('oldPassword', body.oldPassword);
    content_.append('newPassword', body.newPassword);
    let url_ = this.baseUrl + `v1/user/change-password?id=${userId}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, content_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  signup(body: any): Observable<any> {
    let url_ = this.baseUrl + "v1/user/sign-up";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, body, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getCampaignAds(uid: any): Observable<any> {
    let url_ = this.baseUrl + `/v1/campaign-ad-link?expand=campaignAd.campaign,campaignAd.campaign.user.dealership,campaignAd.adVehicles,campaignAd.adVehicles.vehicle.vehicleMake,campaignAd.adVehicles.vehicle.vehicleModel,campaignAd.adVehicles.vehicle.images&filter[uid]=${uid}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  vehicleViewedThroughCampaign(body: any): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicle-views`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, body, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getVehicleTypes(): Observable<any> {
    let url_ = this.baseUrl + `v1/vehicle/vehicle-types/`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getZipCode(latLong: any): Observable<any> {
    // let url_ = this.baseUrl + `v1/vehicle/get-zipcode?lat=${latLong.latitude}&long=${latLong.longitude}`;
    let url_ = this.baseUrl + `v1/vehicle/get-zipcode?lat=40.714224&long=-73.961452`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  getInvitationStatus(uid: any): Observable<any> {
    let url_ = this.baseUrl + `v1/account-invitation/get-invite?q=${uid}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }


  completeAccountInvitationLead(uid: any): Observable<any> {
    let url_ = this.baseUrl + `v1/account-invitation/complete-lead?q=${uid}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  addNewsLetterEMail(body: any){
    let url_ = this.baseUrl + `v1/newsletter-emails`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, body, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  // makeNewLeadAlert(leadId: any): Observable<any> {
  //   let url_ = this.baseUrl + `v1/lead/new-lead-alert?leadId=${leadId}`;
  //   url_ = url_.replace(/[?&]$/, "");
  //   return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
  //       return res;
  //     }),
  //     catchError(errorRes => {
  //       return throwError(() => errorRes);
  //     })
  //   );
  // }

  // forgot password section starts
  requestEmailToken(email: any){
    let url_ = this.baseUrl + `v1/user/forgot-password?email=${email}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get(url_, {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }

  changePasswordWithEmailGeneratedToken(password: any, token: any){
    let url_ = this.baseUrl + `v1/user/reset-password?token=${token}&password=${password}`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, '', {observe: 'response'}).pipe(map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(() => errorRes);
      })
    );
  }
  // forgot password section starts
}
