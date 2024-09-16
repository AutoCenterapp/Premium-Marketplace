import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
        if (args[0] == 'descending') {
          value?.sort((a: any, b: any) => b[args[1]]?.localeCompare(a[args[1]]));
          return value;
        }
        else {
          value?.sort((a: any, b: any) => a[args[1]]?.localeCompare(b[args[1]]));
          return value;
        }
  }

}
