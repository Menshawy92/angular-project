import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// import { getLanguageFromUrl } from './utils.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token") || '';
    // const lang = getLanguageFromUrl() || 'ar';
    return next.handle(httpRequest.clone({ 
      setHeaders: { 
        "Accept-Language": 'en', 
        "platform": 'web', 
        "x-api-key": '1',
        "version": '1',
        Authorization: `Bearer ${token}`
      } 
      }));
  }
}