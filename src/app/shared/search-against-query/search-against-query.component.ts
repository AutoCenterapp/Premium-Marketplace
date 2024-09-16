import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-against-query',
  templateUrl: './search-against-query.component.html',
  styleUrls: ['./search-against-query.component.css']
})
export class SearchAgainstQueryComponent implements OnInit {

  @Output() valueChanges = new EventEmitter();
  private baseUrl: string = environment.apiUrl;
  searchVehiclesCtrl = new FormControl();
  filteredVehicles: any;
  isLoading = false;
  errorMsg!: string;
  minLengthTerm = 3;
  selectedModel: any = "";
  selectedModelId: any = 0;

  searchedText: any = ''
  searchedResults: any = [];
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  

  onSelected() {
    if(this.selectedModel.id){
      this.selectedModelId = this.selectedModel;
    }
    this.applySearch()
  }

  displayWith(value: any) {
    return value?.Title;
  }

  clearSelection() {
    this.selectedModel = "";
    this.filteredVehicles = [];
  }

  searchAgainstCharacter() {
    this.errorMsg = "";
    this.filteredVehicles = [];
    this.isLoading = true;
    this.http.get(this.baseUrl + `v1/vehicle/search?q=${this.searchVehiclesCtrl.value.title ? this.searchVehiclesCtrl.value.title : this.searchVehiclesCtrl.value}`)
      .pipe(
        finalize(() => {
          this.isLoading = false
        }),
      )
      .subscribe((data: any) => {
        if (data.length == 0) {
          this.errorMsg = 'Not data found!';
          this.filteredVehicles = [];
        } else {
          this.errorMsg = "";
          this.filteredVehicles = [];
          this.filteredVehicles = data;
        }
      });
  }

  applySearch() {
    if (this.selectedModelId) {
      sessionStorage.setItem('searchedVehicle', JSON.stringify(this.selectedModelId));
      this.router.navigate(['/marketplace'])
      // alert('Redirect to Marketplace page and filter data using selectedModelId');
    } else if(this.selectedModel){
      sessionStorage.setItem('searchedKeyword', JSON.stringify(this.selectedModel));
      this.router.navigate(['/marketplace']);
    }
    this.valueChanges.emit()
  }

}
