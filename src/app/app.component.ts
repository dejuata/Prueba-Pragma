import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { LIST_MENU, LIST_MENU_OPTIONS } from '@shared/utils/menu';
import { AuthService } from '@core/services/auth/auth.service';
import { User } from '@core/interfaces/user.interface';
import { MenuController } from '@ionic/angular';
import { BnNgIdleService } from 'bn-ng-idle';
import { ToastService } from '@core/services/toast/toast.service';

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
  public timeout = environment.timeout;

  constructor(
    private authService: AuthService,
    private menu: MenuController,
    private bnIdle: BnNgIdleService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.onLogoutTimeout();
  }

  loadUserData() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
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

  onLogoutTimeout() {
    this.bnIdle.startWatching(this.timeout).subscribe((isTimedOut: boolean) => {
      if (this.userData && isTimedOut) {
        const message =
          '¡La sesión se ha cerrado automáticamente por inactividad!';
        this.toastService.presentErrorToast(message);
        this.onLogout();
      }
    });
  }
}
