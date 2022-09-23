import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate(['/login']);
    // .then(()=> {
    //   window.location.reload();
    // });
  }

  goToDashboard() {
    this.navigateTo('/dashboard');
  }

  private navigateTo(path) {
    this.router.navigate([path]);
  }
}
