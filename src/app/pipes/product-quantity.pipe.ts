import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productQuantity'
})
export class ProductQuantityPipe implements PipeTransform {

  transform(value: number): string {
    return `${value === 1 ? '1 product' : `${value} products`}`;
  }

}
