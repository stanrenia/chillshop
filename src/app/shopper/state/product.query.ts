import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ProductState, Product, ProductStore } from './product.state';

@Injectable({ providedIn: 'root' })
export class ProductQuery extends QueryEntity<ProductState, Product> {  
  constructor(protected store: ProductStore) {
    super(store);
  }
}
