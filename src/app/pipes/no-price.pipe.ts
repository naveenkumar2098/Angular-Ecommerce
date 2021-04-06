import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noPrice'
})
export class NoPricePipe implements PipeTransform {

  transform(value: number): string {
    return value === 0 ? 'n/a' : value.toString();
  }

}
