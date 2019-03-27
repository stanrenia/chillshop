import { EntityState, EntityStore, StoreConfig, ID } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface ShopListItem {
    id: ID;
    quantity: number;
    checked: boolean;
    alias: string;
    productId: string;
}

export interface ShopList {
    id: ID;
    label: string;
    categoryId: string;
    items: ShopListItem[];
}

export interface ShopListState extends EntityState<ShopList>{
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'shopper' })
export class ShopListStore extends EntityStore<ShopListState, ShopList> {
  constructor() {
    super();
  }
}
