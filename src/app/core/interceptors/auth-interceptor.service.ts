import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '@core/services/auth/auth.service';
import { ToastService } from '@core/services/toast/toast.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private toastService: ToastService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(request)).pipe(
      catchError((requestError: HttpErrorResponse) => this.handleHttpError(requestError))
    );
  }

  addAuthToken(request: HttpRequest<any>) {
    const token = this.authService.getCookie('token');

    if (!token) {
      return request;
    }

    return request.clone({
      setHeaders: {
        token: `${token}`,
      },
    });
  }

  handleHttpError(
    requestError: HttpErrorResponse
  ) {
    if (requestError && requestError.status === 500) {
      this.authService.logout();
    }

    if (requestError && (requestError.status !== 200)) {
      this.toastService.presentErrorToast(requestError.error.msg);
    }

    return throwError(() => requestError);
  }
}
