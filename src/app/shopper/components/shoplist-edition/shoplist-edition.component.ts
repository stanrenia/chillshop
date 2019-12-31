import { Component, ViewChild, OnInit } from '@angular/core';
import { ShopListQuery, ShopListItemUI, ShopListItemGroup } from '../../state/shoplist.query';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShopListService } from '../../state/shoplist.service';
import { AppTitleService } from '../../../chill/services/app-title.service';
import { ActivatedRoute } from '@angular/router';
import { ID } from '@datorama/akita';
import { ProductQuery } from '../../state/product.query';
import { Product } from '../../state/product.state';
import { ToastController, IonList, ModalController } from '@ionic/angular';
import { EditionModalComponent } from '../edition-modal/edition-modal.component';
import { distinctUntilChanged, debounceTime, filter, tap, map } from 'rxjs/operators';
import { ProductService } from '../../state/product.service';
import { CreateEntityComponent, CreateEntityProps } from 'src/app/chill/create-entity/create-entity.component';
import { TemplatesService } from 'src/app/templates/state/templates.service';
import { Template } from 'src/app/templates/state/template.model';

@Component({
  selector: 'app-shoplist-edition',
  templateUrl: './shoplist-edition.component.html',
  styleUrls: ['./shoplist-edition.component.scss'],
})
export class ShoplistEditionComponent implements OnInit {

  itemGroups$: Observable<ShopListItemGroup[]>;
  products$: Observable<Product[]>;

  itemForm: FormGroup;
  shoplistId: ID;

  @ViewChild('itemList', { static: true }) ionList: IonList;

  constructor(
    private query: ShopListQuery,
    private service: ShopListService,
    private fb: FormBuilder,
    private appTitleService: AppTitleService,
    private route: ActivatedRoute,
    private productQuery: ProductQuery,
    private productService: ProductService,
    private templateService: TemplatesService,
    private modalController: ModalController,
    private toastCtrl: ToastController
  ) {
    this.makeForm();
  }

  makeForm(): any {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      category: [undefined]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.shoplistId = params.id;
      this.itemGroups$ = this.query.getItemsGroupByCategory(this.shoplistId);
      this.appTitleService.setTitle(`Shopper - Edition : ${this.query.getShopListName(this.shoplistId)}`);
    });

    this.setFormObservables();

    // Since the subscription is made in the template with an AsyncPipe inside a NgIf, return null in order to hide products suggestions.
    this.products$ = this.productQuery.selectVisibleProducts()
      .pipe(
        map(products => products && products.length > 0 ? products : null)
      );
  }

  private setFormObservables(): any {
    this.itemForm.get('name').valueChanges.pipe(
      filter((name: string) => name && name.length > 2),
      distinctUntilChanged(),
      debounceTime(200),
      tap(nextName => {
        this.productService.setFilter({ name: nextName });
        this.dismissToast();
      })
    ).subscribe();
  }

  async createShoplistItem(itemName: string) {
    if (!this.itemForm.valid) {
      return;
    }

    const itemId = this.service.createShopListItem(this.shoplistId, itemName, null);
    this.itemForm.reset();
    this.presentToast(itemId, itemName);
  }

  editItem(item: ShopListItemUI) {
    this.presentModal(item.id);
  }

  removeItem(item: ShopListItemUI) {
    this.service.removeItem(this.shoplistId, item.id);
  }

  setItemsOrder(itemGroup: ShopListItemGroup, sortedItems: ShopListItemUI[]) {
    this.service.setItemsOrder(itemGroup.categoryId, sortedItems);
  }

  toggleItemCheck(item: ShopListItemUI) {
    this.service.toggleItemCheck(this.shoplistId, item);
  }

  toggleHide(itemGroup: ShopListItemGroup) {
    this.service.toggleItemGroupVisibility(itemGroup);
  }

  private async presentToast(itemId: ID, itemName: string) {
    const message = this.getToastMessage(itemId, itemName);

    const toast = await this.toastCtrl.create(<any>{
      message,
      color: 'secondary',
      cssClass: 'edition-toast-button',
      duration: 5000,
      buttons: [{
        text: 'Edit',
        handler: () => {
          this.presentModal(itemId);
        },
        icon: 'create',
      }]
    });

    toast.present();
  }

  private getToastMessage(itemId: ID, itemName: string): string {
    const quantity = this.query.getShopListItem(this.shoplistId, itemId).quantity;
    let message = '';
    if (quantity === 1) {
      message = `${itemName} added.`;
    }
    else {
      message = `Another ${itemName} was added. (Total: ${quantity})`;
    }
    return message;
  }

  private async presentModal(itemId: ID) {
    const modal = await this.modalController.create({
      component: EditionModalComponent,
      componentProps: { edition: { shoplistId: this.shoplistId, itemId } }
    });

    await modal.present();
    this.ionList.closeSlidingItems();
  }

  itemGroupTrackByFn(itemGroup: ShopListItemGroup) {
    return itemGroup.categoryId;
  }

  trackByIdFn(ngForElement: {id: ID}) {
    return ngForElement.id;
  }

  private async dismissToast() {
    const currentToast = await this.toastCtrl.getTop();
    if (currentToast) {
      currentToast.dismiss();
    }
  }

  doReorder(ev: any) {
    ev.detail.complete();
  }

  async saveAsTemplate() {
    const modal = await this.modalController.create({
      component: CreateEntityComponent,
      componentProps: <CreateEntityProps>{
        placeholder: 'Template name',
      }
    });

    await modal.present();

    const modalResult = await modal.onWillDismiss();
    this.templateService.add({
      shoplistId: this.shoplistId,
      label: modalResult.data
    } as Template);
  }

}
