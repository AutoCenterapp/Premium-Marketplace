import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageSort'
})
export class ImageSortPipe implements PipeTransform {

  transform(value: any[]): any[] {
    return value.sort((n1,n2) =>
    {
      return n1.image_order - n2.image_order;
    });
  }

}
