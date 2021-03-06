import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryModel} from '../models/category.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  get(): Promise<CategoryModel[]>;
  get(key: string): Promise<CategoryModel>;
  get(key?: string) {
    if (!key) {
      return this.http.get<{id, name, achievements: []}[]>('http://api.achievement.ee:8080/category').pipe(
        map(categories => categories.map( category => new CategoryModel(category)))
      ).toPromise();
    }
    return this.http.get<{id, name, achievements: []}>(`http://api.achievement.ee:8080/category/${key}`).pipe(
      map( category => new CategoryModel(category))
    ).toPromise();
  }

  save(category: CategoryModel) {
    return this.http.put<number>(`http://api.achievement.ee:8080/category`, category).subscribe( id => category.setId(id));
  }

  delete(category: CategoryModel) {
    return this.http.delete(`http://api.achievement.ee:8080/category/${category.getKey()}`).subscribe();
  }
}
