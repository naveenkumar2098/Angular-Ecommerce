import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.css']
})
export class ShoppingCartListComponent implements OnInit {

  @Input() shoppingCart: any;
  @Input() user: User;

  @Output() checkingOut: EventEmitter<boolean> = new EventEmitter();

  product: Product;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  deleteFromCart(id: number) {
    this.cartService.removeFromCart(this.user, this.shoppingCart, id);
  }
  
  calculatePrice(id: number): number {
    let price = 0;
    this.shoppingCart.forEach((el: any): number => el.product.id === id ? price = (el.product.price * el.quantity) : price);
    return price;
  }

  updateQuantity(quantity: number, productId: number) {
    this.cartService.addToCart(this.user.id, productId, quantity, true);
  }

  calculateTotal(): number {
    let total = 0;
    for (let i = 0, l = this.shoppingCart.length; i < l; i++) {
      total += this.shoppingCart[i].product.price * this.shoppingCart[i].quantity;
    }
    return total;
  }

  toCheckOut() {
    this.checkingOut.emit(true);
  }

}
