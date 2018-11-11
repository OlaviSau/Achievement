import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {AppRequestCache} from '../app.request-cache';
import {tap} from 'rxjs/operators';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private cache: AppRequestCache) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.method !== 'GET') { return next.handle(req); }

    return this.cache.get(req) ? of(this.cache.get(req)) : next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(req, event);
        }
      })
    );
  }
}
