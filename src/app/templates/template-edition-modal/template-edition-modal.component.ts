import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, IonList } from '@ionic/angular';
import { Template } from '../state/template.model';

export interface TemplateEditionProps {
  template: Template;
}

@Component({
  selector: 'app-template-edition-modal',
  templateUrl: './template-edition-modal.component.html',
  styleUrls: ['./template-edition-modal.component.scss'],
})
export class TemplateEditionModalComponent implements OnInit {
  props: TemplateEditionProps;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.props = <TemplateEditionProps>this.navParams.data;
  }

  dismissModal(e) {
    this.modalCtrl.dismiss();
  }

  edit(templateName: string) {
    this.modalCtrl.dismiss(templateName);
  }

}
