import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../models/category';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';

@Component({
  selector: 'ad-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  categories: Observable<Category[]>;

  constructor(private store: Store<AppState>) {
    this.categories = store.select('categories');
  }

  ngOnInit() {
  }

}
