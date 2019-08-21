import { EntityState, EntityStore, StoreConfig, ID } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Product {
    id: ID;
    name: string;
    aliases: string[];
    categoryId: ID;
}

export interface ProductFilter {
  name: string;
}

export interface ProductState extends EntityState<Product>{
  ui: {
    filter: ProductFilter
  }
}

const initialState: Partial<ProductState> = {
  ui: {
    filter: { name: '' }
  }
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'product' })
export class ProductStore extends EntityStore<ProductState, Product> {
  constructor() {
    super(initialState);
  }

  setFilter(filter: ProductFilter) {
    this.update( { ui: { filter } } );
  }
}
