import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopListQuery, ShopListUI } from '../../state/shoplist.query';
import { Observable } from 'rxjs';
import { ShopListService } from '../../state/shoplist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppTitleService } from '../../../chill/services/app-title.service';
import { ShopperPaths } from '../../shopper.constants';
import { Template } from 'src/app/templates/state/template.model';
import { IonList } from '@ionic/angular';
import { ShoplistEditionModalComponent, ShoplistEditionModalProps } from '../../components/shoplist-edition-modal/shoplist-edition-modal.component';
import { ShoplistCreationModalComponent, ShoplistCreationModalResult } from '../../components/shoplist-creation-modal/shoplist-creation-modal.component';
import { ModalService } from 'src/app/chill/services/modal.service';

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
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.shoplists$ = this.query.getAllForUI();
  }

  ionViewWillEnter() {
    this.appTitleService.setTitle('Shopper');
  }

  async showCreateForm() {
    await this.modalService.displayModal(
      ShoplistCreationModalComponent,
      {},
      (data: ShoplistCreationModalResult) => {
        this.service.createShopList({
          label: data.label,
          categoryName: data.category,
          dueDate: data.dueDate,
          template: data.selectedTemplate
        });
    });
  }

  goToEdit(shoplist: ShopListUI) {
    this.router.navigate([ShopperPaths.EDIT, shoplist.id], { relativeTo: this.route });
  }

  async onEditClicked(shoplist: ShopListUI) {
    await this.modalService.displayModal(
      ShoplistEditionModalComponent,
      {
        label: shoplist.label,
        categoryName: shoplist.categoryName
      } as ShoplistEditionModalProps,
      ({ label, categoryName }: ShoplistEditionModalProps) => {
        this.service.update(shoplist.id, label, categoryName);
      }
    );
    this.ionList.closeSlidingItems();
  }

  onRemoveClicked(shoplist: ShopListUI) {
    this.service.remove(shoplist.id);
  }
}
