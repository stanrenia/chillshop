import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ProductCategoryState, ProductCategory, ProductCategoryStore } from './product-category.state';

@Injectable({ providedIn: 'root' })
export class ProductCategoryQuery extends QueryEntity<ProductCategoryState, ProductCategory> {  
  constructor(protected store: ProductCategoryStore) {
    super(store);
  }
}
