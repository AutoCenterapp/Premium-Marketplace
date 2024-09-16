
import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {BackendService} from '../services/backend.service';

import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal, NgbModalOptions, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Title} from '@angular/platform-browser';

import { Options } from '@angular-slider/ngx-slider';
import { Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs';

@Component({
  selector: 'app-dealer-iframe',
  templateUrl: './dealer-iframe.component.html',
  styleUrls: ['./dealer-iframe.component.css']
})
export class DealerIframeComponent implements OnInit,OnDestroy {
  @ViewChild("locationModal", {static: true}) locationModal: ElementRef | undefined;
  showHideSearchFilters: any = false;
  showLoader: any = false;
  minLengthTerm = 3;
  carListingPageSize = 16;
  searchedResults: any = [];
  queryOfVehicle: any = ''
  loadingData: any = false;
  vehicles: any = [];
  errorMessage: string = '';
  advanceSearchResults: any;
  pageNumber: number = 1;
  pageNumberAdvanceSearch: number = 1;
  pageNumberZipCodeSearch: number = 1;
  pageNumberSelectedVehicleTypeSearch: number = 1;
  pageNumberSelectedKeywordSearch: number = 1;
  totalCount: number = 0;
  sortingType: any = 'ascending';
  sortBy: any = 'transID';
  currentSelection: any = 'Listing Date: Newest first';
  searchedVehicle: any;
  searchKeyword: any;
  selectedVehicleType: any;
  postal_address: any;
  dealerShipId: number =0;
  dealerShipUid: any ;

  constructor(private titleService: Title, private modalService: NgbModal, private backendService: BackendService, private activatedRoute: ActivatedRoute) {
     this.dealerShipUid = this.activatedRoute.snapshot.params['UID'];

  }

  ngOnDestroy(): void {
    this.removeSearchFilter();
  }

  ngOnInit(): void {

    this.getDealershipAgaisntUID();
   // this.router.events.subscribe((url:any) => console.log(url));
    // @ts-ignore
    document.getElementById("footer-view").remove();
    // @ts-ignore
    document.getElementById("mobile-header").remove();
    // @ts-ignore
    document.getElementById("desktop-header").remove();
    this.titleService.setTitle('Auto Center - Dealer Feed Iframe');


  }
  getDealershipAgaisntUID()
  {
    this.backendService.getDealershipId(this.dealerShipUid).subscribe((response: any) => {
      if(response.body.id>0)
      {
        this.dealerShipId=response.body.id;
        this.modelIdCheck();
      }

    });
  }

  modelIdCheck() {

    this.vehicles = []
    this.searchedVehicle = sessionStorage.getItem('searchedVehicle');
    this.selectedVehicleType = sessionStorage.getItem('selectedVehicleType');
    this.searchKeyword = sessionStorage.getItem('searchedKeyword');
    let post_add = localStorage.getItem('postal_address');
    if (this.searchedVehicle && this.searchedVehicle != null && this.searchedVehicle != undefined) {
      this.searchedVehicle = JSON.parse(this.searchedVehicle)
      this.getVehiclesAgainstModel()
    } else if (this.selectedVehicleType && this.selectedVehicleType != null && this.selectedVehicleType != undefined) {
      this.selectedVehicleType = JSON.parse(this.selectedVehicleType)
      this.getVehiclesAgainstSelectedVehicleType()
    } else if (this.searchKeyword && this.searchKeyword != null && this.searchKeyword != undefined) {
      this.searchKeyword = JSON.parse(this.searchKeyword);
      this.getVehiclesAgainstSelectedKeyword()
    }
      // else if (post_add != 'undefined' && post_add != undefined && post_add != null) {
      //   this.postal_address = post_add
      //   this.locationForm.controls.zip_code.setValue(this.postal_address);
      //   this.searchVehiclesAgainstZipCode()
    // }
    else {
      this.getVehicles()
    }
  }

  getVehicles() {
    this.loadingData = true;
    this.backendService.getVehicles(this.carListingPageSize, this.pageNumber, `filter[dealership_id]=${this.dealerShipId}`).subscribe((response: any) => {
      this.loadingData = false;
      if (response.status == 200 && response.body && response.body.length > 0) {
        this.totalCount = response.headers.get('X-Pagination-Total-Count');
        if (this.vehicles.length >= this.totalCount) {
          return
        }
        response.body.forEach((data: any) => {
          this.vehicles.push(data);
        })
      } else {
        this.vehicles = [];
      }
    });
  }

  getVehiclesAgainstModel() {
    this.backendService.getDealerVehiclesAgainstModel(this.carListingPageSize, this.pageNumber, Number(this.searchedVehicle.id),`filter[dealership_id]=${this.dealerShipId}`).subscribe((response: any) => {
      if (response.status == 200 && response.body && response.body.length > 0) {
        this.totalCount = response.headers.get('X-Pagination-Total-Count')
        response.body.forEach((data: any) => {
          this.vehicles.push(data);
        })
        this.pageNumber = this.pageNumber + 1;
      } else {
        this.vehicles = [];
      }
    });
  }

  getVehiclesAgainstSelectedVehicleType() {
    this.backendService.getDealerVehiclesAgainstSelectedVehicleType(this.carListingPageSize, this.pageNumberSelectedVehicleTypeSearch, Number(this.selectedVehicleType.id),this.dealerShipId).subscribe((response: any) => {
      if (response.status == 200 && response.body && response.body.length > 0) {
        this.totalCount = response.headers.get('X-Pagination-Total-Count')
        response.body.forEach((data: any) => {
          this.vehicles.push(data);
        })
        this.pageNumberSelectedVehicleTypeSearch = this.pageNumberSelectedVehicleTypeSearch + 1;
      } else {
        this.vehicles = [];
      }
    });
  }

  getVehiclesAgainstSelectedKeyword() {
    this.loadingData = true;
    this.backendService.getDealerVehiclesAgainstSelectedKeyword(this.carListingPageSize, this.pageNumberSelectedKeywordSearch, this.searchKeyword,this.dealerShipId).subscribe((response: any) => {
      this.loadingData = false;
      if (response.status == 200 && response.body && response.body.length > 0) {
        this.totalCount = response.headers.get('X-Pagination-Total-Count');
        if (this.vehicles.length >= this.totalCount) {
          return
        }
        response.body.forEach((data: any) => {
          this.vehicles.push(data);
        })
        this.pageNumberSelectedKeywordSearch = this.pageNumberSelectedKeywordSearch + 1;
      } else {
        this.vehicles = [];
      }
    });
  }

  /// Not worked on this as Dealership
  getVehiclesAgainstQuery() {
    this.loadingData = true;
    this.backendService.getVehiclesAgainstQuery(this.queryOfVehicle, this.carListingPageSize, this.pageNumber).subscribe((response: any) => {
      this.loadingData = false;
      if (response.status == 200 && response.body && response.body.length > 0) {
        this.totalCount = response.headers.get('X-Pagination-Total-Count');
        if (this.vehicles.length >= this.totalCount) {
          return
        }
        response.body.forEach((data: any) => {
          this.vehicles.push(data);
        })
      } else {
        this.vehicles = [];
      }
    });
  }

  getVehiclesAgainstAdvanceSearch() {
    this.backendService.DealeradvancedSearch(this.advanceSearchResults.filters, this.pageNumberAdvanceSearch,this.dealerShipId).subscribe((response: any) => {
      if (response.status == 200 && response.body && response.body.length > 0) {
        this.totalCount = response.headers.get('X-Pagination-Total-Count')
        response.body.forEach((data: any) => {
          this.vehicles.push(data);
        })
        this.pageNumberAdvanceSearch = this.pageNumberAdvanceSearch + 1;
      } else {
        this.vehicles = [];
      }
    });
  }

  onScroll() {
    if (this.vehicles.length >= this.totalCount) {
      return
    } else {
      if (this.searchedVehicle && this.searchedVehicle != null && this.searchedVehicle != undefined && this.searchKeyword != undefined) {
        this.getVehiclesAgainstModel()
      } else if (this.selectedVehicleType && this.selectedVehicleType != null && this.selectedVehicleType != undefined) {
        this.getVehiclesAgainstSelectedVehicleType()
      } else if (this.searchKeyword && this.searchKeyword != null && this.searchKeyword != undefined) {
        this.getVehiclesAgainstSelectedKeyword()
      } else if (this.advanceSearchResults && this.advanceSearchResults != null && this.advanceSearchResults != undefined) {
        this.getVehiclesAgainstAdvanceSearch()
      } else if (this.queryOfVehicle != '') {
        this.pageNumber = this.pageNumber + 1;
        this.getVehiclesAgainstQuery()
      } else if (this.postal_address != null) {
        this.searchVehiclesAgainstZipCode()
      } else {
        this.pageNumber = this.pageNumber + 1;
        this.getVehicles()
      }
    }
  }

  setSortingValues(sortBy: string, type: string, currentSelection: string) {
    this.sortBy = sortBy;
    this.sortingType = type;
    this.currentSelection = currentSelection
  }

  removeSearchFilter() {
    this.vehicles = []
    this.searchedVehicle = null;
    this.selectedVehicleType = null;
    this.searchKeyword = null;
    sessionStorage.removeItem('searchedVehicle');
    sessionStorage.removeItem('searchedKeyword');
    sessionStorage.removeItem('selectedVehicleType');
    // localStorage.removeItem('postal_address');
    this.advanceSearchResults = null;
    this.postal_address = null;
    this.closeModal()
    this.getVehicles()
  }

  searchedResultsFunction(event: any) {
    if(event.type=='zipCodeSearch'){
      this.locationForm = event.locationFormValues
      this.searchVehiclesAgainstZipCode()
    } else {
      this.advanceSearchResults = event;
      this.vehicles = this.advanceSearchResults.response.body;
      this.totalCount = event.response.headers.get('X-Pagination-Total-Count')
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  clearFiltersEventFromChild(event: any){
    this.advanceSearchResults = null;
    this.postal_address = null;
    this.vehicles = []
    this.getVehicles()
  }

  vehiclesAgainstQuery(event: any) {
    this.totalCount = 0;
    this.queryOfVehicle = event;
    this.vehicles = [];
    this.getVehiclesAgainstQuery()
  }

  applySearch() {
    this.totalCount = 0;
    this.pageNumberSelectedKeywordSearch = 1;
    this.modelIdCheck()
  }

  // location section starts

  openLocationModal() {
    const config: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
    };
    this.modalService.open(this.locationModal, config);
  }
   // not working on this
  searchVehiclesAgainstZipCode() {
    this.postal_address = this.locationForm.controls.zip_code.value
    localStorage.setItem('postal_address', this.locationForm.controls.zip_code.value ? this.locationForm.controls.zip_code.value : this.postal_address);
    let payLoad: any = {
      zip_code: this.locationForm.controls.zip_code.value,
      radius: this.locationForm.controls.radius.value == 'Nationwide' ? 'all' : this.locationForm.controls.radius.value
    };
    this.showLoader = true
    this.backendService.searchVehiclesAgainstZipCode(payLoad, this.pageNumberZipCodeSearch).subscribe({
      next: (response) => {
        this.showLoader = false;
        this.modalService.dismissAll();
        if (response.status == 200 && response.body && response.body.length > 0) {
          this.totalCount = response.headers.get('X-Pagination-Total-Count')
          this.vehicles = [];
          response.body.forEach((data: any) => {
            this.vehicles.push(data);
          })
          this.pageNumberZipCodeSearch = this.pageNumberZipCodeSearch + 1;
          if (Object.keys(this.vehicles[0]).includes('distance')) {
            this.vehicles = this.vehicles.sort((a: any, b: any) => (a.distance < b.distance ? -1 : 1));
          }
        } else {
          this.vehicles = [];
          this.errorMessage = response.body.error;
          this.totalCount = 0
        }
      },
      error: (error) => {
        this.showLoader = false;
        this.modalService.dismissAll();
      },
    })
  }

  closeModal() {
    this.modalService.dismissAll()
  }

  // zipcode portion starts

  getCurrentLocation() {
    navigator.permissions.query({name: 'geolocation'}).then((permissionStatus) => {
      permissionStatus.onchange = () => {
        if (permissionStatus.state == "denied") {
          this.modelIdCheck()
        }
      };
    });
    if (navigator.geolocation) {
      this.modelIdCheck()
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position && position.coords) {
          if (localStorage.getItem('longitude') == null) {
            localStorage.setItem('latitude', position.coords.latitude)
            localStorage.setItem('longitude', position.coords.longitude);
            this.getZipCode(position.coords)
          } else {
            if (localStorage.getItem('longitude') != position.coords.longitude || localStorage.getItem('latitude') != position.coords.latitude) {
              this.getZipCode(position.coords)
            } else {
              localStorage.setItem('latitude', position.coords.latitude)
              localStorage.setItem('longitude', position.coords.longitude);
              this.modelIdCheck();
            }
          }
        }
      });
    } else {
      this.modelIdCheck()
    }
  }


  getZipCode(latLong: any) {
    if (latLong == null) {
      return
    } else {
      this.showLoader = true;
      this.backendService.getZipCode(latLong).subscribe({
        next: (response) => {
          this.showLoader = false;
          if (response && response.status == 200 && response.body.zipcode) {
            localStorage.setItem('postal_address', response.body.zipcode);
          }
          this.modelIdCheck();
        },
        error: () => {
          this.showLoader = false;
          this.modelIdCheck();
        },
        complete: () => {
          this.showLoader = false
        }
      })
    }
  }

  // zipcode portion ends

  @ViewChild('advanceSearchTemplateRef') advanceSearchTemplateRef: TemplateRef<any> | undefined;
  showHideSearchModalOrSection(){
    this.modalService.open(this.advanceSearchTemplateRef)
    if(this.makes.length>0){
      return
    }
    this.getMakes();
    this.getColors();
    this.getBodyStyles();
    this.generateArrayOfYears();
    this.getCurrentLocation()
  }


  // advance search portion starts
  condition = 'Condition';
  color: any;
  bodyStyle: any = {
    'name': 'Select Body Style',
    'id': 0
  }
  make: any;
  model: any;
  yearlte = '';
  yeargte = '';
  mileagelte = 0;
  mileagegte = 0;
  pricelte = 0;
  pricegte = 0;
  fuel_type = 'None';
  title = '';
  customPriceSelection: any = false;
  slider: Options = {
    floor: 0,
    ceil: 60000,
    minLimit: 1,
    maxLimit: 60000
  };

  makes: any = [];
  colors: any = [];
  bodyStyles: any = [];
  models: any = [];
  years: any = [];
  yearslte: any = [];
  yearsgte: any = [];
  advanceSearchOnInIt(){
    if(this.makes.length>0 || this.showHideSearchFilters==true){
      return
    }
    this.getMakes();
    this.getColors();
    this.getBodyStyles();
    this.generateArrayOfYears();
    this.getCurrentLocation()
  }

  generateArrayOfYears() {
    let max = new Date().getFullYear()
    let min = max - 19
    let years = []

    for (let i = max; i >= min; i--) {
      years.push(i)
    }
    this.years = years;
    this.yearslte = years
    this.yearsgte = years
  }

  getColors() {
    this.colors = []
    this.backendService.getColors().subscribe((response: any) => {
      if (response && response.status == 200) {
        if (response.body && response.body.length > 0) {
          this.colors = response.body;
          // this.color = this.colors[0]
        }
      }
    });
  }

  getBodyStyles() {
    this.backendService.getBodyStyles().subscribe((response: any) => {
      if (response && response.status == 200) {
        if (response.body && response.body.length > 0) {
          this.bodyStyles = response.body;
          // this.bodyStyle = this.bodyStyles[0]
        }
      }
    });
  }

  getMakes() {
    this.makes = []
    this.backendService.getMakes().subscribe((response: any) => {
      if (response && response.status == 200) {
        if (response.body && response.body.length > 0) {
          this.makes = response.body;
          this.getModels(this.makes[0].id);
        }
      }
    });
  }

  getModels(makeId: number) {
    if(!makeId){
      return
    }
    this.models = []
    this.backendService.getModels(makeId).subscribe((response: any) => {
      if (response && response.status == 200) {
        if (response.body && response.body.length > 0) {
          this.models = response.body;
        }
      }
    });
  }

  lengthOfAppliedFilters: number = 0;

  advanceSearch() {
    let filters: any;
    this.showLoader = true;
    filters = this.model != undefined ? ('filter[model]=' + this.model.id + '&') : '';
    filters = filters + (this.color != undefined ? ('filter[color]=' + this.color.id + '&') : '');
    filters = filters + (this.bodyStyle.id != 0 ? ('filter[vehicle_type]=' + this.bodyStyle.id + '&') : '');
    filters = filters + (this.make != undefined? ('filter[make]=' + this.make.id + '&') : '');
    filters = filters + (this.condition != 'Condition' ? ('filter[condition]=' + this.condition + '&') : '');
    filters = filters + (this.yearlte != '' ? ('filter[year][gte]=' + this.yearlte + '&') : '');
    filters = filters + (this.yeargte != '' ? ('filter[year][lte]=' + this.yeargte + '&') : '');
    filters = filters + (this.mileagelte != 0 ? ('filter[mileage][lte]=' + this.mileagelte + '&') : '');
    filters = filters + (this.mileagegte != 0 ? ('filter[mileage][gte]=' + this.mileagegte + '&') : '');
    filters = filters + (this.pricelte != 0 ? ('filter[price][lte]=' + this.pricelte + '&') : '');
    filters = filters + (this.pricegte != 0 ? ('filter[price][gte]=' + this.pricegte + '&') : '');
    filters = filters + (this.fuel_type != 'None' ? ('filter[fuel_type]=' + this.fuel_type + '&') : '');
    filters = filters + (this.title != '' ? ('filter[title]=' + this.title + '&') : '');
    this.lengthOfAppliedFilters = filters.split('&').length-1;
    this.backendService.dealerAdvancedSearch(filters,this.dealerShipId).subscribe((response: any) => {
      this.showLoader = false;
      if (response && response.status == 200) {
        let type = 'advanceSearch';
        this.searchedResultsFunction({ response, filters, type});
        this.modalService.dismissAll();
      }
    });
  }

  numberOnly(event: any) {
    if (event.target.value < 5000) {
      this.pricegte = 5000
    }
  }

  suggestValueDropdown(yearslte: any, event: any) {
    if (yearslte == 'yearslte') {
      this.yearslte = this.years.filter(function (obj: any) {
        obj = obj.toString()
        if (obj.includes(event.target.value)) {
          return obj;
        }
      })
      this.yearlte = event.target.value
    } else {
      this.yearsgte = this.years.filter(function (obj: any) {
        obj = obj.toString()
        if (obj.includes(event.target.value)) {
          return obj;
        }
      })
      this.yeargte = event.target.value
    }
  }

  searchMake: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.makeclick$.pipe(filter(() => !this.makeinstance?.isPopupOpen()));
    const inputFocus$ = this.makefocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term: any) =>
        (term === '' ? this.makes : this.makes.filter((v: any) => v.title.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
      ),
    );
  };
  searchModel: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.modelclick$.pipe(filter(() => !this.modelinstance?.isPopupOpen()));
    const inputFocus$ = this.modelfocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term: any) =>
        (term === '' ? this.models : this.models.filter((v: any) => v.title.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
      ),
    );
  };
  searchColor: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.colorclick$.pipe(filter(() => !this.colorinstance?.isPopupOpen()));
    const inputFocus$ = this.colorfocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term: any) =>
        (term === '' ? this.colors : this.colors.filter((v: any) => v.title.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
      ),
    );
  };
  makefocus$ = new Subject<string>();
  makeclick$ = new Subject<string>();
  modelfocus$ = new Subject<string>();
  modelclick$ = new Subject<string>();
  colorfocus$ = new Subject<string>();
  colorclick$ = new Subject<string>();
  formatter = (state: any) => state.title;
  @ViewChild('makeinstance', { static: true }) makeinstance: NgbTypeahead | undefined | any;
  @ViewChild('modelinstance', { static: true }) modelinstance: NgbTypeahead | undefined | any;
  @ViewChild('colorinstance', { static: true }) colorinstance: NgbTypeahead | undefined | any;

  resetAllFilters(){
    this.make=undefined
    this.model=undefined
    this.bodyStyle={'name': 'Select Body Style','id': 0}
    this.condition='Condition'
    this.color=undefined
    this.yearlte='';
    this.yeargte = ''
    this.pricelte=0;
    this.pricegte = 0;
    this.resetRadioButton()
    this.clearFiltersEventFromChild('advanceSearch')
    // this.closeModal()
  }

  resetRadioButton(){
    for(let i=0;i<4;i++){
      let x: any = document.getElementById(`flexCheckChecked${i}`);
      if(x){
        x.checked = false;
      }
    }
  }


  // Zip code portion starts
  radiusArray = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', 'Nationwide']
  public locationForm = new FormGroup({
    radius: new FormControl(this.radiusArray[0]),
    zip_code: new FormControl('', Validators.required)
  })

  get zip_code() {
    return this.locationForm.get('zip_code');
  }

  emitValueToParentToGetVehiclesAGainstZipCode(){
    if (this.locationForm.invalid) {
      Object.keys(this.locationForm.controls).forEach(field => {
        const control = this.locationForm.get(field);
        control?.markAsTouched({onlySelf: true});
      });
      return
    }
    let locationFormValues = this.locationForm  ;
    let type = 'zipCodeSearch';
    this.searchedResultsFunction({ locationFormValues, type})
  }

  clearFiltersEvent(){
    if(this.locationForm.valid){
      this.locationForm.reset();
      this.locationForm.controls.radius.setValue(this.radiusArray[0])
      this.clearFiltersEventFromChild('zipCodeSearch');
    }
  }
  // Zip code portion ends
  // advance search portion ends

}
