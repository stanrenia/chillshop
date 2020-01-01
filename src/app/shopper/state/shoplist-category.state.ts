import { EntityState, EntityStore, StoreConfig, ID } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface ShoplistCategory {
    id: ID;
    label: string;
    icon: string;
}

export interface ShoplistCategoryFilter {
  name: string;
}

export interface ShoplistCategoryState extends EntityState<ShoplistCategory> {
  ui: {
    filter: ShoplistCategoryFilter
  };
}

const initialState: Partial<ShoplistCategoryState> = {
  ui: {
    filter: { name: null }
  }
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'category' })
export class ShoplistCategoryStore extends EntityStore<ShoplistCategoryState, ShoplistCategory> {
  constructor() {
    super(initialState);
  }

  setFilter(filter: ShoplistCategoryFilter) {
    this.update( { ui: { filter } } );
  }
}
