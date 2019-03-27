import { ShopListStore, ShopList } from './shoplist.state';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShopListService {

    constructor(private shopListStore: ShopListStore) { }

    createShopList(label: string) {
        this.shopListStore.add({ label } as ShopList);
    }
}
