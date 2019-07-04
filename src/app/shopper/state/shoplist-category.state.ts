import { EntityState, EntityStore, StoreConfig, ID } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface ShoplistCategory {
    id: ID;
    label: string;
    icon: string;
}

export interface ShoplistCategoryState extends EntityState<ShoplistCategory>{
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'category' })
export class ShoplistCategoryStore extends EntityStore<ShoplistCategoryState, ShoplistCategory> {
  constructor() {
    super();
  }
}
