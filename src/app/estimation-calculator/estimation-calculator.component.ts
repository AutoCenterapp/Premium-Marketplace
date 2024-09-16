import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-estimation-calculator',
  templateUrl: './estimation-calculator.component.html',
  styleUrls: ['./estimation-calculator.component.css']
})
export class EstimationCalculatorComponent implements OnInit {

  constructor() { }
  @Input() vehicle: any;

  ngOnInit(): void {
  }
  
  estimatedPayment = 0;
  creditScore = [
    { 'title': 'Rebuilding', 'range': '<640', 'usedCarAPR': 0.1192, 'newCarAPR': 0.1774, 'selected': true },
    { 'title': 'Fair', 'range': '641-679', 'usedCarAPR': 0.0765, 'newCarAPR': 0.1126, 'selected': false },
    { 'title': 'Good', 'range': '680-739', 'usedCarAPR': 0.0468, 'newCarAPR': 0.0604, 'selected': false },
    { 'title': 'Excellent', 'range': '>740', 'usedCarAPR': 0.0365, 'newCarAPR': 0.0429, 'selected': false },
  ];
  loanTerm = [
    { 'title': '36 mo', 'value': 36, 'selected': true },
    { 'title': '48 mo', 'value': 48, 'selected': false },
    { 'title': '60 mo', 'value': 60, 'selected': false },
    { 'title': '72 mo', 'value': 72, 'selected': false },
  ];
  downPayment = 0;
  selectedLoanTerm: any = this.loanTerm[0];
  selectedCreditScore: any = this.creditScore[0];

  calculateEstimatedPrice() {
    let P = this.vehicle?.price - Number(this.downPayment);
    let apr = this.vehicle?.condition == 'New' ? this.selectedCreditScore.newCarAPR : this.selectedCreditScore.usedCarAPR
    let i: any = apr / 12;
    let n = this.selectedLoanTerm.value;
    this.estimatedPayment = P * ((i * Math.pow((1 + i), n)) / ((Math.pow((1 + i), n)) - 1));
  }

  makeSelection(array: any, selectedVal: any, type: string) {
    array.forEach((element: any) => {
      element.selected = false;
    });
    selectedVal.selected = true;
    if (type == 'cs') {
      this.selectedCreditScore = selectedVal
      // this.calculateEstimatedPrice(this.vehicle?.condition=='New'?selectedVal.newCarAPR: selectedVal.usedCarAPR)
    } else {
      this.selectedLoanTerm = selectedVal
      // this.calculateEstimatedPrice(selectedVal.value)
    }
    return selectedVal;
  }

}
