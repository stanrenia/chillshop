import { EntityState, EntityStore, StoreConfig, ID, EntityUIStore } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Product {
    id: ID;
    name: string;
    categoryId: string;
}

export interface ProductUI {
  name: string;
}

export interface ProductState extends EntityState<Product>{
}
export interface ProductUIState extends EntityState<ProductUI> {}


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'product' })
export class ProductStore extends EntityStore<ProductState, Product> {
  ui: EntityUIStore<ProductUIState, ProductUI>;
  
  constructor() {
    super();
    this.createUIStore();
  }
}
