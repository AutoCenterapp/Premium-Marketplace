import { Options } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-car-listing-filter',
  templateUrl: './car-listing-filter.component.html',
  styleUrls: ['./car-listing-filter.component.css']
})
export class CarListingFilterComponent implements OnInit {

  @Output() searchedResults = new EventEmitter();
  @Output() closeModalInstance = new EventEmitter();
  @Output() clearFilters = new EventEmitter();
  @Input() showLoader: any;
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
  constructor(private backendService: BackendService) { }

  makes: any = [];
  colors: any = [];
  bodyStyles: any = [];
  models: any = [];
  years: any = [];
  yearslte: any = [];
  yearsgte: any = [];
  ngOnInit(): void {
    this.getMakes();
    this.getColors();
    this.getBodyStyles();
    this.generateArrayOfYears();
    this.getCurrentLocation()
  };

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

  advanceSearch() {
    let filters: any;
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
    // debugger
    // if(filters==''){
    //   return
    // }
    this.backendService.advancedSearch(filters).subscribe((response: any) => {
      if (response && response.status == 200) {
        let type = 'advanceSearch';
        // if (response.body && response.body.length > 0) {
        this.searchedResults.emit({ response, filters, type})
        // this.closeModal() 
        // }
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
      map((term) =>
        (term === '' ? this.makes : this.makes.filter((v: any) => v.title.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
      ),
    );
  };
  searchModel: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.modelclick$.pipe(filter(() => !this.modelinstance?.isPopupOpen()));
    const inputFocus$ = this.modelfocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === '' ? this.models : this.models.filter((v: any) => v.title.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
      ),
    );
  };
  searchColor: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.colorclick$.pipe(filter(() => !this.colorinstance?.isPopupOpen()));
    const inputFocus$ = this.colorfocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
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
    this.clearFilters.emit('advanceSearch')
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

  getCurrentLocation() {
    navigator.permissions.query({name: 'geolocation'}).then((permissionStatus) => {
      permissionStatus.onchange = () => {
        if (permissionStatus.state == "denied") {
          // this.modelIdCheck()
        }
      };
    });
    if (navigator.geolocation) {
      // this.modelIdCheck()
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
              // this.modelIdCheck();
            }
          }
        }
      });
    } else {
      // this.modelIdCheck()
    }
  }


  getZipCode(latLong: any) {
    if (latLong == null) {
      return
    } else {
      this.backendService.getZipCode(latLong).subscribe({
        next: (response) => {
          if (response && response.status == 200 && response.body.zipcode) {
            localStorage.setItem('postal_address', response.body.zipcode);
            this.locationForm.controls.zip_code.setValue(response.body.zipcode)
            this.locationForm.controls.radius.setValue(this.radiusArray[10]);
            this.emitValueToParentToGetVehiclesAGainstZipCode()
            // this.closeModal()
          }
          // this.modelIdCheck();
        },
        error: () => {
          // this.modelIdCheck();
        },
        complete: () => {
        }
      })
    }
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
    this.searchedResults.emit({ locationFormValues, type})
    // this.closeModal()
  }

  clearFiltersEvent(){
    if(this.locationForm.valid){
      this.locationForm.reset();
      this.locationForm.controls.radius.setValue(this.radiusArray[0])
      this.clearFilters.emit('zipCodeSearch');
      // this.closeModal()
    }
  }
  // Zip code portion ends

  closeModal(){
    this.closeModalInstance.emit('close-modal');
  }
}
