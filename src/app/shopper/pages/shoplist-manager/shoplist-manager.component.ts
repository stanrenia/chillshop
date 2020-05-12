import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopListQuery, ShopListUI } from '../../state/shoplist.query';
import { Observable } from 'rxjs';
import { ShopListService } from '../../state/shoplist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppTitleService } from '../../../chill/services/app-title.service';
import { ShopperPaths } from '../../shopper.constants';
import { Template } from 'src/app/templates/state/template.model';
import { ModalController, IonList } from '@ionic/angular';
import { ShoplistEditionModalComponent, ShoplistEditionModalProps } from '../../components/shoplist-edition-modal/shoplist-edition-modal.component';
import { ShoplistCreationModalComponent, ShoplistCreationModalResult } from '../../components/shoplist-creation-modal/shoplist-creation-modal.component';

@Component({
  selector: 'app-shoplist-manager',
  templateUrl: './shoplist-manager.component.html',
  styleUrls: ['./shoplist-manager.component.scss']
})
export class ShoplistManagerComponent implements OnInit {
  shoplists$: Observable<ShopListUI[]>;

  templates: Observable<Template[]>;

  @ViewChild('listWithSlidings', { static: true }) ionList: IonList;

  constructor(
    private query: ShopListQuery,
    private service: ShopListService,
    private router: Router,
    private route: ActivatedRoute,
    private appTitleService: AppTitleService,
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    this.appTitleService.setTitle('Shopper');
    this.shoplists$ = this.query.getAllForUI();
  }

  ionViewWillEnter() {}

  async showCreateForm() {
    const modal = await this.modalCtrl.create({
      component: ShoplistCreationModalComponent
    });

    await modal.present();
    const modalResult = await modal.onWillDismiss();

    if (modalResult.data) {
      const data: ShoplistCreationModalResult = modalResult.data;
      this.service.createShopList({
        label: data.label,
        categoryName: data.category,
        dueDate: data.dueDate,
        template: data.selectedTemplate
      });
    }

  }

  goToEdit(shoplist: ShopListUI) {
    this.router.navigate([ShopperPaths.EDIT, shoplist.id], { relativeTo: this.route });
  }

  async onEditClicked(shoplist: ShopListUI) {
    const modal = await this.modalCtrl.create({
      component: ShoplistEditionModalComponent,
      componentProps: {
        label: shoplist.label,
        categoryName: shoplist.categoryName
      } as ShoplistEditionModalProps
    });

    await modal.present();
    const modalResult = await modal.onWillDismiss();

    if (modalResult.data) {
      const { label, categoryName } = <ShoplistEditionModalProps>modalResult.data;
      this.service.update(shoplist.id, label, categoryName);
    }

    this.ionList.closeSlidingItems();
  }

  onRemoveClicked(shoplist: ShopListUI) {
    this.service.remove(shoplist.id);
  }
}
