import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalCtrl: ModalController) { }

  public async displayModal(component: any, componentProps: any, cb?: (result: any) => any) {
    const modal = await this.modalCtrl.create({
      component,
      componentProps
    });
    await modal.present();

    if (cb) {
      const modalResult = await modal.onWillDismiss();
      if (modalResult.data) {
        cb(modalResult.data);
      }
    }
  }
}
