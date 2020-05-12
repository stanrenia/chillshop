import { Component, ViewChild, OnInit } from '@angular/core';
import { ShopListQuery, ShopListItemUI, ShopListItemGroup } from '../../state/shoplist.query';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShopListService } from '../../state/shoplist.service';
import { AppTitleService } from '../../../chill/services/app-title.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ID } from '@datorama/akita';
import { ProductQuery } from '../../state/product.query';
import { Product } from '../../state/product.state';
import { ToastController, IonList } from '@ionic/angular';
import { ShoplistItemEditionModalComponent } from '../shoplist-item-edition-modal/shoplist-item-edition-modal.component';
import { distinctUntilChanged, debounceTime, filter, tap, map } from 'rxjs/operators';
import { ProductService } from '../../state/product.service';
import { CreateEntityComponent, CreateEntityProps } from 'src/app/chill/create-entity/create-entity.component';
import { TemplatesService } from 'src/app/templates/state/templates.service';
import { Template } from 'src/app/templates/state/template.model';
import { ConfirmationModalComponent, ConfirmationModalProps } from 'src/app/chill/confirmation-modal/confirmation-modal.component';
import { ModalService } from 'src/app/chill/services/modal.service';
import { AppPaths } from 'src/app/app.constants';

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
  toolbarTitle: string;

  @ViewChild('itemList', { static: true }) ionList: IonList;

  constructor(
    private query: ShopListQuery,
    private service: ShopListService,
    private fb: FormBuilder,
    private appTitleService: AppTitleService,
    private route: ActivatedRoute,
    private router: Router,
    private productQuery: ProductQuery,
    private productService: ProductService,
    private templateService: TemplatesService,
    private toastCtrl: ToastController,
    private modalService: ModalService
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
    this.appTitleService.setDisplay(false);

    this.route.params.subscribe(params => {
      this.shoplistId = params.id;
      this.itemGroups$ = this.query.getItemsGroupByCategory(this.shoplistId);
      this.toolbarTitle = `Shopper - Edition : ${this.query.getShopListName(this.shoplistId)}`;
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
    await this.modalService.displayModal(
      ShoplistItemEditionModalComponent,
      { edition: { shoplistId: this.shoplistId, itemId } }
    );

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
    await this.modalService.displayModal(
      CreateEntityComponent,
      <CreateEntityProps>{ placeholder: 'Template name' },
      (result) => {
        this.templateService.add({
          shoplistId: this.shoplistId,
          label: result.data
        } as Template);
      }
    );
  }

  async markAsDone() {
    // Get remaining items and if any then display "complete shoplist popup"
    const shoplistId = this.shoplistId;
    if (this.query.hasAnyUncheckedItems(shoplistId)) {
      await this.modalService.displayModal(
        ConfirmationModalComponent,
        <ConfirmationModalProps>{ title: 'Create shoplist ?', content: 'Do you want to create a new shoplist of the remaining items ?' },
        (result) => {
          // If popup returns yes, then create new shoplist with remaining items
          this.service.createShopListFromUncheckedItems(shoplistId);
        }
      );
    }

    // Set as Done
    this.service.setAsDone(this.shoplistId);

    this.router.navigate([AppPaths.SHOPPER]);
  }

}
