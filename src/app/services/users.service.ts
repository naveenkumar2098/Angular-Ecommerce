import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  listAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  listOne(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/' + id);
  }

  listOneByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(this.url + `?email_like=${email}`);
  }

  insertUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  editUser(user: User): Observable<User> {
    return this.http.patch<User>(this.url + "/" + user.id, {
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email,
      "password": user.password,
      "address": user.address,
      "addressOpt": user.addressOpt,
      "phone": user.phone,
      "postalCode": user.postalCode,
      "city": user.city,
      "country": user.country
    });
  }

  editUserAddress(user: User): Observable<User> {
    return this.http.patch<User>(this.url + "/" + user.id, {
      "firstName": user.firstName,
      "lastName": user.lastName,
      "address": user.address,
      "addressOpt": user.addressOpt,
      "phone": user.phone,
      "postalCode": user.postalCode,
      "city": user.city,
      "country": user.country
    });
  }

  editUserShoppingCart(user: User): Observable<User> {
    return this.http.patch<User>(this.url + "/" + user.id, { "shoppingCart": user.shoppingCart });
  }

  editUserOrders(user: User): Observable<User> {
    return this.http.patch<User>(this.url + '/' + user.id, { "orders": user.orders });
  }

}
