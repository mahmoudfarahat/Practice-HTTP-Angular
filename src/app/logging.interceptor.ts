import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Out")
    console.log(request.headers)
    return next.handle(request).pipe(tap(event => {
      if(event.type === HttpEventType.Response)
      {
        console.log('again')
        console.log(event.body)
      }
    }));

  }
}
