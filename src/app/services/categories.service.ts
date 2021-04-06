import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  url: string = "http://localhost:3000/categories";

  constructor(private http: HttpClient) { }

  listAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }
}
