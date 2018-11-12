import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryModel} from '../models/category.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  save(category: CategoryModel) {
    return this.http.put(`http://api.achievement.ee:8080/categories/${category.key}`, category).subscribe(
      response => console.log(response)
    );
  }

  get(): Promise<CategoryModel[]>;
  get(key: string): Promise<CategoryModel>;

  get(key?: string) {
    if (!key) {
      return this.http.get<CategoryModel[]>('http://api.achievement.ee:8080/categories').pipe(
        map(categories => categories.map( category => new CategoryModel(category)))
      ).toPromise();
    }
    return this.http.get<CategoryModel>(`http://api.achievement.ee:8080/categories/${key}`).pipe(
      map( category => new CategoryModel(category))
    ).toPromise();
  }

}
