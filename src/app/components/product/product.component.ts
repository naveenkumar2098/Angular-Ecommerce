import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { Category } from 'src/app/interfaces/category';
import { ProductsService } from 'src/app/services/products.service';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt-PT';
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { LoginService } from 'src/app/services/login.service';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user';
registerLocaleData(localePt, 'pt');

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  userId: number;
  user: User;

  product: Product;
  productId: number;
  selectedImg: number = 0;

  stock: number[];
  quantity: number = 1;

  addedToCart: boolean = false;
  successQnt: number;
  modal: BsModalRef;

  constructor(private route: ActivatedRoute, private usersService: UsersService, private productsService: ProductsService, private loginService: LoginService, private cartService: CartService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params.id;
    this.productsService.listOne(this.productId).subscribe((data: Product): Product => {
      this.product = data;
      this.calcStock();
      return this.product;
    });
    if (this.loginService.hasLoggedIn) this.checkAvailability();
  }

  changeSelectedImg(id: number) {
    this.selectedImg = id;
  }

  calcStock() {
    // Workaround for creating a ngFor from a number
    this.stock = [];
    for (let i = 0, l = this.product.stock; i < l; i++) this.stock.push(i);
  }

  checkAvailability() {
    // check how many units the user can buy
    this.userId = this.loginService.userId;
    this.usersService.listOne(this.userId).subscribe(data => {
      this.user = data;
      this.user.shoppingCart.forEach(el => {
        // when the product is already in the cart
        if ((el.productId === this.product.id) && (el.quantity === this.product.stock)) this.product.stock = 0
        else if (el.productId === this.product.id) this.product.stock -= el.quantity;
      });
      this.calcStock();
    });
  }

  addToCart(warning: ModalModule) {
    if (this.loginService.hasLoggedIn) {
      this.userId = this.loginService.userId; // track the user
      // ui changes
      this.product.stock -= this.quantity; // remove the selected quantity from stock
      this.calcStock(); // recalculate stock
      this.addedToCart = this.cartService.addToCart(this.userId, this.productId, this.quantity);
      // ui show info
      setTimeout(() => this.addedToCart = false, 1500);
      this.successQnt = this.quantity;
      //prevent from adding the same amount
      this.quantity = 1;
    } else {
      this.modal = this.modalService.show(warning);
      window.scroll(0, 0);
    }
  }

  ngOnDestroy() {
    if (this.loginService.hasLoggedIn) this.checkAvailability();
  }
}
