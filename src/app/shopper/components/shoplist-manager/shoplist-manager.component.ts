import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopListQuery, ShopListUI, ShopListItemUI } from '../../state/shoplist.query';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShopListService } from '../../state/shoplist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppTitleService } from '../../../chill/services/app-title.service';
import { ShopperPaths } from '../../shopper.constants';
import { TemplatesQuery } from 'src/app/templates/state/templates.query';
import { Template } from 'src/app/templates/state/template.model';
import { ModalController, IonList } from '@ionic/angular';
import { ShoplistEditionModalComponent, ShoplistEditionModalProps } from '../shoplist-edition-modal/shoplist-edition-modal.component';

@Component({
  selector: 'app-shoplist-manager',
  templateUrl: './shoplist-manager.component.html',
  styleUrls: ['./shoplist-manager.component.scss']
})
export class ShoplistManagerComponent implements OnInit {
  shoplists$: Observable<ShopListUI[]>;

  shopListForm: FormGroup;
  displayForm = false;
  templates: Observable<Template[]>;

  @ViewChild('listWithSlidings', { static: true }) ionList: IonList;

  constructor(
    private query: ShopListQuery,
    private service: ShopListService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appTitleService: AppTitleService,
    private templatesQuery: TemplatesQuery,
    private modalCtrl: ModalController
  ) {
    this.makeForm();
  }

  makeForm(): any {
    this.shopListForm = this.fb.group({
      label: ['', Validators.required],
      category: [undefined],
      selectedTemplate : [null]
    });
  }

  ngOnInit() {
    this.appTitleService.setTitle('Shopper');
    this.shoplists$ = this.query.getAllForUI();
    this.templates = this.templatesQuery.getTemplates();
  }

  ionViewWillEnter() {}

  createShopList(formValue) {
    if (!this.shopListForm.valid) {
      return;
    }

    this.service.createShopList(formValue.label, formValue.category, formValue.selectedTemplate);

    // Clear inputs
    this.shopListForm.patchValue({
      label: '',
      category: '',
      selectedTemplate: null
    });
  }
  
  goToEdit(shoplist: ShopListUI) {
    this.router.navigate([ShopperPaths.EDIT, shoplist.id], {
      relativeTo: this.route
    });
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
