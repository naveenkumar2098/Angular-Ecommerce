import { NoPricePipe } from './no-price.pipe';

describe('NoPricePipe', () => {
  it('create an instance', () => {
    const pipe = new NoPricePipe();
    expect(pipe).toBeTruthy();
  });
});
