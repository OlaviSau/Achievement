import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryModel} from '../models/category.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Promise<CategoryModel[]> {
    return this.http.get<CategoryModel[]>('http://api.achievement.ee:8080/categories').pipe(
      map(categories => categories.map( category => new CategoryModel(category)))
    ).toPromise();
  }

  getCategory(key): Promise<CategoryModel> {
    return this.http.get<CategoryModel>(`http://api.achievement.ee:8080/categories/${key}`).pipe(
      map( category => new CategoryModel(category))
    ).toPromise();
  }
}
