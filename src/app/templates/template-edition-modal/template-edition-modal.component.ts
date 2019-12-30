import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-template-edition-modal',
  templateUrl: './template-edition-modal.component.html',
  styleUrls: ['./template-edition-modal.component.scss'],
})
export class TemplateEditionModalComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    
  }

}
