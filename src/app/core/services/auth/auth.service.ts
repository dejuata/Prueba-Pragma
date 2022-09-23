import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { LoginDTO } from '@core/interfaces/login.interface';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { ToastService } from '@core/services/toast/toast.service';
import { LoadingService } from '@core/services/loading/loading.service';
import { User } from '@app/core/interfaces/user.interface';
import { NavigationService } from '@core/services/navigation/navigation.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly uriLogin = '/api/login';
  private currentUserSource = new BehaviorSubject<User>(null);
  private http: HttpClient;

  constructor(
    httpBackend: HttpBackend,
    private cookies: CookieService,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private navigationService: NavigationService
  ) {
    this.http = new HttpClient(httpBackend);
  }

  login(dto: LoginDTO) {
    this.loadingService.showLoading();

    return this.http
      .post(`${environment.backendUrl}${this.uriLogin}`, dto)
      .pipe(
        map((res: any) => {
          this.loadingService.hideLoading();
          if (res.token) {
            this.setCookie('token', res.token);
            const user = {
              ...res.userInfo
            };
            this.setCookie('user', JSON.stringify(user));
            this.currentUserSource.next(user);

            return { status: true };
          }
          return { status: false };
        }),
        catchError((err) => {
          this.loadingService.hideLoading();
          console.log(err);

          if(err.error.msg === 'Incorrect user or password') {
            const message = 'Documento de identidad y/o Contraseña incorrecta';
            this.toastService.presentErrorToast(message);
          } else {
            this.toastService.presentErrorToast(err.error.msg);
          }
          return of({ status: false });
        })
      );
  }

  logout() {
    this.cookies.deleteAll('/');
    this.cookies.deleteAll('/dashboard');
    this.currentUserSource.next(null);
    this.navigationService.goToLogin();
  }

  getCookie(key: string) {
    return this.cookies.get(key);
  }

  getCurrentUser() {

    if (this.getCookie('user')) {
      const user = JSON.parse(this.getCookie('user'));
      this.currentUserSource.next(user);
    }

    return this.currentUserSource.asObservable();
  }

  private setCookie(key: string, value: string) {
    if (this.getCookie(key)) {
      this.cookies.delete(key);
    }

    this.cookies.set(key, value);
  }

}
