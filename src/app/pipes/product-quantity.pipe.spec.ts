import { ProductQuantityPipe } from './product-quantity.pipe';

describe('ProductQuantityPipe', () => {
  it('create an instance', () => {
    const pipe = new ProductQuantityPipe();
    expect(pipe).toBeTruthy();
  });
});
