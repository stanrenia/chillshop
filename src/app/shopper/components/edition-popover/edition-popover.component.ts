import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { ShopListQuery, ShopListItemUI } from '../../state/shoplist.query';
import { map } from 'rxjs/operators';
import { ShopListService } from '../../state/shoplist.service';
import { ShopListItem } from '../../state/shoplist.state';
import { ID } from '@datorama/akita/src';

@Component({
  selector: 'app-edition-popover',
  templateUrl: './edition-popover.component.html',
  styleUrls: ['./edition-popover.component.scss'],
})
export class EditionPopoverComponent {

  item: ShopListItemUI;
  shoplistId: ID;

  constructor(private navParams: NavParams, private shoplistQuery: ShopListQuery, private popoverCtrl: PopoverController, private shoplistService: ShopListService) {
  }

  ionViewWillEnter() {
    const { shoplistId, itemId } = this.navParams.data.edition;
    this.shoplistId = shoplistId;

    this.shoplistQuery.getItemsByShopListId(shoplistId).pipe(
      map(items => items.find(i => i.id === itemId))
    ).subscribe(item => {
      this.item = item;

    });
  }

  save(quantity: number) {
    const item: Partial<ShopListItem> = { quantity };
    this.shoplistService.updateItem(this.shoplistId, this.item.id, item);

    this.popoverCtrl.dismiss();
  }

  cancel() {
    this.popoverCtrl.dismiss();
  }
}
