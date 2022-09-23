import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { LIST_MENU, LIST_MENU_OPTIONS } from '@shared/utils/menu';
import { AuthService } from '@core/services/auth/auth.service';
import { User } from '@core/interfaces/user.interface';
import { MenuController } from '@ionic/angular';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  public listItemMenu = [];
  public listOptionsItemMenu = [];
  public version = environment.versionInfo.version;
  public userData: User = null;

  constructor(private authService: AuthService, private menu: MenuController) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.authService.getCurrentUser().subscribe((user) => {
      if(user) {
        this.userData = user;
        this.listItemMenu = LIST_MENU;
        this.listOptionsItemMenu = LIST_MENU_OPTIONS;
      }
    });
  }

  onLogout() {
    this.menu.close();
    // this.menu.enable(false);
    this.authService.logout();
  }
}
