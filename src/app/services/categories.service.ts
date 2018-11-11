import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://api.achievement.ee:8080/categories').pipe(
      map(categories => categories.map( category => new Category(category)))
    );
  }

  getCategory(key): Observable<Category> {
    return this.http.get<Category>(`http://api.achievement.ee:8080/categories/${key}`).pipe(
      map( category => new Category(category))
    );
  }
}
