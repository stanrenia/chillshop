import { EntityState, EntityStore, StoreConfig, ID } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Product {
    id: ID;
    name: string;
    categoryId: string;
}

export interface ProductState extends EntityState<Product>{
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'product' })
export class ProductStore extends EntityStore<ProductState, Product> {
  constructor() {
    super();
  }
}
