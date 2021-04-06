import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from '../interfaces/product';
import { UsersService } from './users.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  user: User;
  product: Product;

  constructor(private productsService: ProductsService, private usersService: UsersService) { }

  addToCart(userId: number, productId: number, quantity: number, editing: boolean = false): boolean {
    // ng model & typescript "bug" fix
    productId = parseInt(`${productId}`);
    quantity = parseInt(`${quantity}`);
    // find duplicates
    this.usersService.listOne(userId).subscribe((data: User): void => {
      this.user = data;
      let duplicateIndex: number;
      let duplicateQuantity: number = quantity;
      // verify duplicate products, add quantity and keep its index for removal
      this.user.shoppingCart.forEach((el, idx) => {
        if (el['productId'] === productId) {
          duplicateQuantity += el.quantity;
          duplicateIndex = idx;
        }
      });
      // if duplicate, remove the old line in the duplicateIndex, insert the new one
      // push as is for no duplicates or when editing
      if (duplicateIndex !== undefined) this.user.shoppingCart.splice(duplicateIndex, 1, { 'productId': productId, 'quantity': !editing ? duplicateQuantity : quantity });
      else this.user.shoppingCart.push({ 'productId': productId, 'quantity': quantity });
      // update user with the new shoppingCart propriety
      this.usersService.editUserShoppingCart(this.user).subscribe((data: User): User => this.user = data);
    });
    return true;
  }

  removeFromCart(user: User, shoppingCart: any, productId: number) {
    // remove product from cart
    shoppingCart.forEach((el, idx) => el.product.id === productId ? shoppingCart.splice(idx, 1) : null);
    // recreate cart in original format (productId, quantity, stock)
    let cartOgFormat = [];
    shoppingCart.forEach(el => cartOgFormat.push({ 'productId': el.product.id, 'quantity': el.quantity }));
    // update user's cart in the service
    user.shoppingCart = cartOgFormat;
    this.usersService.editUserShoppingCart(user).subscribe((data: User): User => this.user = data);
  }

  updateStock(productId: number, quantity: number) {
    this.productsService.listOne(productId).subscribe((data: Product): void => {
      this.product = data;
      this.product.stock -= quantity;
      this.productsService.editProductStock(this.product).subscribe(data => this.product = data);
    });
  }

}
