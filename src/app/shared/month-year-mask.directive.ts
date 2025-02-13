import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[monthYearLengthMask]'
})
export class MonthYearLengthMaskDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: any) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event: { target: { value: any; }; }) {
    this.onInputChange(event.target.value, true);
  }
  

  onInputChange(event: string, backspace: boolean) {
    let newVal = event.replace(/\D/g, '');
    if (backspace && newVal.length <= 3) {
      newVal = newVal.substring(0, newVal.length - 1);
    }
    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 2) {
      let newValNumber = Number(newVal);
      if(newValNumber>12){
        newVal = String(12)
      }
      newVal = newVal.replace(/^(\d{0,2})/, '$1/');
    } else if (newVal.length <= 4) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,2})/, '$1/$2');
    } else {
      newVal = newVal.substring(0, 4);
      newVal = newVal.replace(/^(\d{0,2})(\d{0,2})/, '$1/$2');
    }
    if(this.ngControl.valueAccessor!=null){
      this.ngControl.valueAccessor.writeValue(newVal);
    }
  }

}
