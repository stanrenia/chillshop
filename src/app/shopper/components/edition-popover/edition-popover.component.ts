import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ShopListQuery, ShopListItemUI } from '../../state/shoplist.query';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edition-popover',
  templateUrl: './edition-popover.component.html',
  styleUrls: ['./edition-popover.component.scss'],
})
export class EditionPopoverComponent {

  item: ShopListItemUI;

  constructor(private navParams: NavParams, private shoplistQuery: ShopListQuery) { }

  ionViewWillEnter() {
    const { shoplistId, itemId } = this.navParams.data.edition;

    this.shoplistQuery.getItemsByShopListId(shoplistId).pipe(
      map(items => items.find(i => i.id === itemId))
    ).subscribe(item => {
      this.item = item;
    });
  }
}
