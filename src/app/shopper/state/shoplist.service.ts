import { ShopListStore, ShopList } from './shoplist.state';
import { Injectable } from '@angular/core';
import { ShopListQuery } from './shoplist.query';

@Injectable({ providedIn: 'root' })
export class ShopListService {

    constructor(private shopListStore: ShopListStore, private query: ShopListQuery) { }

    createShopList(label: string) {
        const count = this.query.getCount();
        this.shopListStore.add({ id: count + 1, label } as ShopList);
    }
}
