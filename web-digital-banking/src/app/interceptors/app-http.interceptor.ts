import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';
import {AuthService} from '../services/auth.service';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService)
  const token: string = authService.accessToken;

  console.log(token)

  if (!req.url.includes('login')) {
    let request = token
      ? req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)})
      : req;
    console.log(token)
    console.log(request)
    return next(request).pipe(
      catchError( err => {
        if (err.status === 401) {
          authService.logout();
        }

        return throwError(() => err);
      })
    );
  }

  return next(req);
};
