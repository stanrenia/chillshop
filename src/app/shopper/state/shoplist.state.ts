import { EntityState, EntityStore, StoreConfig, ID } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface ShopListItem {
    id: ID;
    quantity: number;
    checked: boolean;
    productId: string;
}

export interface ShopList {
    id: ID;
    label: string;
    categoryId: string;
    items: ShopListItem[];
}

export interface ShopListState extends EntityState<ShopList>{
  ui: ShopListUIState;
}

export interface ShopListUIState {
  itemGroups: {
    hiddenIds: ID[]
  };
  filters: {
    categories: string;
  };
}

const initialState: Partial<ShopListState> = {
  ui: {
    itemGroups: {
      hiddenIds: []
    },
    filters: {
      categories: null
    }
  }
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'shopper' })
export class ShopListStore extends EntityStore<ShopListState, ShopList> {

  constructor() {
    super(initialState);
  }

  updateUIState(nextUiState: ShopListUIState): any {
    this.update({ui: nextUiState});
  }
}
