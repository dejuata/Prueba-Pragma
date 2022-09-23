import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public generalLoading: any = null;

  constructor(private loadingCtrl: LoadingController) { }

  async showLoading() {
    this.generalLoading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'circles',
    });

    this.generalLoading.present();
  }

  hideLoading() {
    this.generalLoading.dismiss();
  }
}
