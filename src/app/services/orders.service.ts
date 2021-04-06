import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url: string = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  listAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url);
  }

  // listByClientId(id: number): Observable<Order[]> {
  //   return this.http.get<Order[]>(this.url + `?clientId_like=${id}`);
  // }

  insertOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.url, order);
  }

}
