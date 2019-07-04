import { EntityState, EntityStore, StoreConfig, ID } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface ProductCategory {
    id: ID;
    name: string;
    categoryId: string;
}

export interface ProductCategoryState extends EntityState<ProductCategory>{
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'productCategory' })
export class ProductCategoryStore extends EntityStore<ProductCategoryState, ProductCategory> {
  constructor() {
    super();
  }
}
