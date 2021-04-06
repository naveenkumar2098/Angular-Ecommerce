import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Shipping } from '../interfaces/shipping';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  url: string = 'http://localhost:3000/shippingMethods';

  constructor(private http: HttpClient) { }

  listAll(): Observable<Shipping[]> {
    return this.http.get<Shipping[]>(this.url);
  }

  listOne(id: number): Observable<Shipping> {
    return this.http.get<Shipping>(this.url + '/' + id);
  }
}
