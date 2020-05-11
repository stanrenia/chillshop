import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TemplatesQuery } from 'src/app/templates/state/templates.query';
import { Template } from 'src/app/templates/state/template.model';

export interface ShoplistCreationModalResult {
  label: string;
  category: string;
  dueDate: Date;
  selectedTemplate: Template;
}

@Component({
  selector: 'app-shoplist-creation-modal',
  templateUrl: './shoplist-creation-modal.component.html',
  styleUrls: ['./shoplist-creation-modal.component.scss'],
})
export class ShoplistCreationModalComponent implements OnInit {
  shopListForm: FormGroup;
  templates$: Observable<Template[]>;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private templatesQuery: TemplatesQuery
  ) {
    this.makeForm();
  }

  ngOnInit() {
    this.templates$ = this.templatesQuery.getTemplates();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  create() {
    this.modalCtrl.dismiss(this.shopListForm.value);
  }

  createShopList() {
    const val = this.shopListForm.value;
  }

  private makeForm() {
    this.shopListForm = this.fb.group({
      label: [null],
      category: [null],
      dueDate: [null],
      selectedTemplate: [null]
    });
  }

}
