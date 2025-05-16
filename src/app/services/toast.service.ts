import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  async show(message: string, duration: number = 2000) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      cssClass: 'toast-base'
    });
    await toast.present();
  }
}
