import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stock'
})
export class StockPipe implements PipeTransform {

  transform(value: number): string {
    if (value <= 0) {
      return 'No more units available.';
    } else if (value <= 3) {
      return `❗️ Low on stock. Only ${value === 1 ? '1 unit remains.' : `${value} units remain.`}`
    } else {
      return;
    }
  }

}
