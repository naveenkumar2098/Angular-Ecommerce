import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/interfaces/product';
import { Cart } from 'src/app/interfaces/cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  userId: number;
  user: User;
  productsId: Cart[];
  products: Product[] = [];
  shoppingCart: any = [];
  checkingOut: boolean;

  constructor(private usersService: UsersService, private productsService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.usersService.listOne(this.userId).subscribe((data: User): void => {
      // get user and shopping cart
      this.user = data;
      this.productsId = this.user.shoppingCart;
      // get products in cart and add quantity
      this.productsService.listAll().subscribe((data: Product[]): void => {
        this.products = data;
        for (let i = 0, l = this.products.length; i < l; i++) {
          for (let j = 0, m = this.productsId.length; j < m; j++) {
            if (this.products[i].id === this.productsId[j].productId)
              this.shoppingCart.push({ 'product': this.products[i], 'quantity': this.productsId[j].quantity });
          }
        }
      });
    });
    this.checkingOut = false;
  }

  checkOut(event: boolean) {
    this.checkingOut = event;
  }

}

