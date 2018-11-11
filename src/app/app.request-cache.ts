import {HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppRequestCache {
  cache = {};
  constructor() {}

  get(req: HttpRequest<any>) {
    return this.cache[req.url];
  }

  set(req: HttpRequest<any>, content) {
    this.cache[req.url] = content;
  }

}
