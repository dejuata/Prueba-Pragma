import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth.service';
import { NavigationService } from '@app/core/services/navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private navigation: NavigationService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {

    const token = this.authService.getCookie('token');
    const user = this.authService.getCookie('user');

    if(token && user) {
      return true;
    }

    this.navigation.goToLogin();
    return false;
  }

}
