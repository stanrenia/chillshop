import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

export interface ConfirmationModalProps {
  title: string;
  content: string;
}

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  props: ConfirmationModalProps;

  constructor(private modalCtrl: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.props = this.navParams.data as ConfirmationModalProps;
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  confirm() {
    this.modalCtrl.dismiss(true);
  }

}
