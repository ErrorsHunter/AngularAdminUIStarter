import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toast: HotToastService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    if (myToken) {
      request = request.clone({
        // setHeaders: {Authorization: 'D Loc'}
        setHeaders: { Authorization: `Bearer ${myToken}` } //"Beraer "+myToken
      })
    }
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.toast.warning("Token is expired, Please Login again");
            this.router.navigate(["login"]);
          }
          // Handle specific HTTP errors here
          else if (err.status === 404) {
            console.error("Resource not found:", err);
          } else if (err.status === 500) {
            console.error("Internal Server Error:", err);
          }
        }
        return throwError(() => err);
      })
    );
  }
}
