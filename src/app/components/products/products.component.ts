import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { LoginService } from 'src/app/services/login.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() products: Product[];
  @Input() featured: Product[];
  @Input() searching: boolean;
  @Output() stock: EventEmitter<any> = new EventEmitter();

  userId: number;
  productId: number;
  product: Product;
  addedToCart: boolean = false;
  modal: BsModalRef;

  constructor(private modalService: BsModalService, private loginService: LoginService, private cartService: CartService, private productsService: ProductsService) {
  }

  ngOnInit(): void {
  }

  addToCart(warning: ModalModule, productId: number) {
    if (this.loginService.hasLoggedIn) {
      this.userId = this.loginService.userId;
      this.productId = productId;
      this.addedToCart = this.cartService.addToCart(this.userId, productId, 1);
      setTimeout(() => this.addedToCart = false, 2000);
    } else this.modal = this.modalService.show(warning);
    this.stock.emit();
  }

}
