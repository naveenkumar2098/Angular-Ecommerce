import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentsService } from 'src/app/services/payments.service';
import { Payment } from 'src/app/interfaces/payment';
import { Shipping } from 'src/app/interfaces/shipping';
import { ShippingService } from 'src/app/services/shipping.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/interfaces/order';
import { OrderProduct } from 'src/app/interfaces/order-product';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @Input() userId: number;
  @Input() shoppingCart: any;

  @Output() checkingOut: EventEmitter<boolean> = new EventEmitter();

  user: User;
  updating: boolean;

  shippingMethods: Shipping[];
  shippingSelected: string = '3';
  shippingPrice: number = 0;

  paymentMethods: Payment[];
  paymentSelected: string = '1';

  order: Order = { "id": null, "clientId": null, "date": new Date(), "orderProducts": [], "paymentId": null, "shippingId": null, "state": null, "totalPrice": null };
  orderProducts: OrderProduct[] = [];

  success: boolean;

  formCheckout: FormGroup;

  constructor(private paymentsService: PaymentsService, private shippingService: ShippingService, private formBuilder: FormBuilder, private usersService: UsersService, private ordersService: OrdersService, private cartService: CartService, private router: Router) {
    this.formCheckout = this.formBuilder.group({
      firstName: ['', Validators.minLength(2)],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      addressOpt: [''],
      phone: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.usersService.listOne(this.userId).subscribe(data => {
      this.user = data;
      this.formCheckout = this.formBuilder.group({
        firstName: [this.user.firstName, Validators.minLength(2)],
        lastName: [this.user.lastName, Validators.required],
        address: [this.user.address, Validators.required],
        addressOpt: [this.user.addressOpt],
        phone: [this.user.phone, Validators.required],
        postalCode: [this.user.postalCode, Validators.required],
        city: [this.user.city, Validators.required],
        country: [this.user.country, Validators.required]
      });
    });
    this.paymentsService.listAll().subscribe(data => this.paymentMethods = data);
    this.shippingService.listAll().subscribe(data => this.shippingMethods = data);
  }

  toCheckOut() {
    this.checkingOut.emit(false);
  }

  getShippingPrice() {
    this.shippingService.listOne(parseInt(this.shippingSelected)).subscribe(data => this.shippingPrice = data.price);
  }
  calculatePrice(id: number): number {
    let price = 0;
    this.shoppingCart.forEach((el: any): number => el.product.id === id ? price = (el.product.price * el.quantity) : price);
    return price;
  }
  calculateTotal(): number {
    let total = 0;
    for (let i = 0, l = this.shoppingCart.length; i < l; i++) {
      total += this.shoppingCart[i].product.price * this.shoppingCart[i].quantity;
    }
    return total + this.shippingPrice;
  }

  confirmOrder() {
    // Make an OrderProduct[] with the products in the cart
    this.makeProductsList();
    // Make an Order and insert on the order service
    this.order = this.makeOrder();
    this.ordersService.insertOrder(this.order).subscribe((data: Order): Order => this.order = data); // send to db.json
    // remove stock
    this.removeFromStock();
    // clean user cart
    this.user.shoppingCart = [];
    this.usersService.editUserShoppingCart(this.user).subscribe((data: User): User => this.user = data);
    // thank user
    this.success = !this.success;
    setTimeout(() => this.router.navigate(['/orders', this.user.id]), 2000);
  }

  makeProductsList() {
    this.shoppingCart.forEach(el => {
      let orderProduct: OrderProduct;
      orderProduct = {
        'productId': el.product.id, // productId: number
        'quantity': el.quantity, // quantity: number
        'unitPrice': el.product.price, // unitPrice: number
        'subTotal': (el.quantity * el.product.price) // subTotal: number
      };
      this.orderProducts.push(orderProduct);
    });
  }

  makeOrder(): Order {
    this.order.date = new Date(); // data: Date
    this.order.clientId = this.userId; // clientId: number
    this.order.orderProducts = this.orderProducts; // orderProducts: orderProduct[]
    this.order.paymentId = this.paymentMethods[parseInt(this.paymentSelected) - 1].id; // paymentId: number
    this.order.shippingId = this.shippingMethods[parseInt(this.shippingSelected) - 1].id; // shippingId: number
    this.order.totalPrice = this.calculateTotal(); // totalPrice: number
    this.order.state = 'processing'; // state: string
    return this.order;
  }

  removeFromStock() {
    this.shoppingCart.forEach(el => this.cartService.updateStock(el.product.id, el.quantity));
  }

  editAddress() {
    this.updating = true;
  }
  hasAddressOpt() {
    if (this.user.addressOpt !== '') return true;
    else return false;
  }
  updateAddress() {
    let formData = this.formCheckout.value;
    this.user.firstName = formData.firstName;
    this.user.lastName = formData.lastName;
    this.user.address = formData.address;
    this.user.addressOpt = formData.addressOpt;
    this.user.phone = formData.phone;
    this.user.postalCode = formData.postalCode;
    this.user.country = formData.country;
    this.usersService.editUserAddress(this.user).subscribe();
    this.updating = !this.updating;
  }

  get firstName() {
    return this.formCheckout.controls.firstName;
  }
  get lastName() {
    return this.formCheckout.controls.lastName;
  }
  get address() {
    return this.formCheckout.controls.address;
  }
  get addressOpt() {
    return this.formCheckout.controls.addressOpt;
  }
  get phone() {
    return this.formCheckout.controls.phone;
  }
  get postalCode() {
    return this.formCheckout.controls.postalCode;
  }
  get city() {
    return this.formCheckout.controls.city;
  }
  get country() {
    return this.formCheckout.controls.country;
  }

}
