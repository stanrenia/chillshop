import { QueryEntity, EntityUIQuery } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ProductState, Product, ProductStore, ProductUI, ProductUIState } from './product.state';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductQuery extends QueryEntity<ProductState, Product> {  
  ui: EntityUIQuery<ProductUIState, ProductUI>;
  
  constructor(protected store: ProductStore) {
    super(store);
    this.createUIQuery();
  }

  getProducts(): Observable<ProductUI[]> {
    return this.ui.selectAll();
  }
}
