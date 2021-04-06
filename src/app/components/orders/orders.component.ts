import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/interfaces/order';
import { OrderUser } from 'src/app/interfaces/order-user';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  user: User;
  userId: number;
  userOrders: OrderUser[] = [];

  orders: Order[] = [];

  constructor(private route: ActivatedRoute, private ordersService: OrdersService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.ordersService.listAll().subscribe((data: Order[]): void => {
      // user orders
      this.orders = data.filter(data => data.clientId === this.userId);
      // update user orders on user itself
      this.orders.forEach(el => this.userOrders.push({ "orderId": el.id }));
      this.usersService.listOne(this.userId).subscribe(data => {
        this.user = data;
        this.user.orders = this.userOrders;
        this.usersService.editUserOrders(this.user).subscribe();
      });
    });
  }
}
