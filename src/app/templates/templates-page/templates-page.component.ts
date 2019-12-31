import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplatesQuery } from '../state/templates.query';
import { TemplatesService } from '../state/templates.service';
import { Observable } from 'rxjs';
import { Template } from '../state/template.model';
import { AppTitleService } from 'src/app/chill/services/app-title.service';
import { Router } from '@angular/router';
import { ShopperPaths } from '../../shopper/shopper.constants';
import { AppPaths } from 'src/app/app.constants';
import { ModalController, IonList } from '@ionic/angular';
import { TemplateEditionModalComponent, TemplateEditionProps } from '../template-edition-modal/template-edition-modal.component';


@Component({
  selector: 'app-templates-page',
  templateUrl: './templates-page.component.html',
  styleUrls: ['./templates-page.component.scss']
})
export class TemplatesPageComponent implements OnInit {
  templates: Observable<Template[]>;

  @ViewChild('itemList', { static: true }) ionList: IonList;

  constructor(
    private query: TemplatesQuery,
    private service: TemplatesService,
    private titleService: AppTitleService,
    private router: Router,
    private modalCtrl: ModalController
  ) {
    titleService.setTitle('Templates');
  }

  ngOnInit() {
    this.templates = this.query.getTemplates();
  }

  goToEdit(template: Template) {
    this.router.navigate([AppPaths.SHOPPER, ShopperPaths.EDIT, template.shoplistId]);
  }

  async onEditClicked(template: Template) {
    const modal = await this.modalCtrl.create({
      component: TemplateEditionModalComponent,
      componentProps: <TemplateEditionProps>{ template },
    });

    await modal.present();
    const modalResult = await modal.onWillDismiss();

    if (modalResult.data) {
      this.service.update(template.id, { label: modalResult.data });
    }

    this.ionList.closeSlidingItems();
  }

  onRemoveClicked(template: Template) {
    this.service.remove(template.id, template.shoplistId);
  }
}
