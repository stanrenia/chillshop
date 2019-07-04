import { Component } from '@angular/core';
import { ShopListQuery, ShopListItemUI } from '../../state/shoplist.query';
import { Observable } from 'rxjs';
import { ShopListItem } from '../../state/shoplist.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShopListService } from '../../state/shoplist.service';
import { AppTitleService } from '../../services/app-title.service';
import { ActivatedRoute } from '@angular/router';
import { ID } from '@datorama/akita';
import { ProductQuery } from '../../state/product.query';
import { Product } from '../../state/product.state';
import { PopoverController, ToastController } from '@ionic/angular';
import { EditionPopoverComponent } from '../edition-popover/edition-popover.component';
import { map, distinctUntilChanged, take, debounce, debounceTime } from 'rxjs/operators';
import { ProductService } from '../../state/product.service';

@Component({
  selector: 'app-shoplist-edition',
  templateUrl: './shoplist-edition.component.html',
  styleUrls: ['./shoplist-edition.component.scss'],
})
export class ShoplistEditionComponent {

  items$: Observable<ShopListItemUI[]>;
  product$: Observable<Product[]>;

  itemForm: FormGroup;
  shoplistId: ID;

  constructor(
    private query: ShopListQuery,
    private service: ShopListService,
    private fb: FormBuilder,
    private appTitleService: AppTitleService,
    private route: ActivatedRoute,
    private productQuery: ProductQuery,
    private productService: ProductService,
    private popoverController: PopoverController,
    private toastCtrl: ToastController
  ) {
    this.makeForm();
  }

  makeForm(): any {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      category: [undefined]
    });

    this.itemForm.valueChanges.pipe(
      map(values => values.name),
      distinctUntilChanged()
    ).subscribe(name => {
      this.dismissToast();
    });
  }

  ionViewWillEnter() {
    this.route.params.subscribe(params => {
      this.shoplistId = params.id;
      this.items$ = this.query.getItemsByShopListId(this.shoplistId);
      this.appTitleService.setTitle(`Shopper - Edition : ${this.query.getShopListName(this.shoplistId)}`);
    });

    this.setInputObservables();
    this.product$ = this.productQuery.selectVisibleProducts();
  }

  private setInputObservables(): any {
    this.itemForm.get('name').valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(200)
    ).subscribe(nextName => {
      this.productService.setFilter({ name: nextName });
    });
  }

  createShoplistItem(itemName: string) {
    if (!this.itemForm.valid) {
      return;
    }

    const itemId = this.service.createShopListItem(this.shoplistId, itemName, null);
    this.presentToast(itemId, itemName);
    this.itemForm.reset();
  }

  editItem(item: ShopListItemUI) {
    this.presentPopover(item.id);
  }

  private async presentToast(itemId: ID, itemName: string) {
    const message = this.getToastMessage(itemId, itemName);

    const toast = await this.toastCtrl.create({
      message,
      color: 'secondary',
      cssClass: 'edition-toast-button',
      duration: 5,
      buttons: [{
        text: 'Edit',
        handler: () => {
          this.presentPopover(itemId);
        },
        icon: 'create',
        // side: 'start'
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

  private async presentPopover(itemId: ID) {
    const popover = await this.popoverController.create({
      component: EditionPopoverComponent,
      componentProps: {edition: { shoplistId: this.shoplistId , itemId }},
      // cssClass: 'edition-popover',
      // event: ev,
      translucent: true,
      showBackdrop: true
    });
    return await popover.present();
  }

  private async dismissToast() {
    const currentToast = await this.toastCtrl.getTop();
    if (currentToast) {
      currentToast.dismiss();
    }
  }

  debug() {
    this.items$.pipe(take(1)).subscribe(sl => {
      this.presentPopover(sl[0].id);
    })
  }
}
