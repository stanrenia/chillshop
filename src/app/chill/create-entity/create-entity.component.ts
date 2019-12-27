import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

export interface CreateEntityProps {
  placeholder: string;
  onConfirmation: (val: string) => any;
}

@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html',
  styleUrls: ['./create-entity.component.scss'],
})
export class CreateEntityComponent implements OnInit {

  props: CreateEntityProps;

  constructor(private navParams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.props = <CreateEntityProps>this.navParams.data;
  }

  create(val: string) {
    this.props.onConfirmation(val);
    this.modalCtrl.dismiss(val);
  }

}
