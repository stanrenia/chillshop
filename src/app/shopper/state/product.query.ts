import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ProductState, Product, ProductStore } from './product.state';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductQuery extends QueryEntity<ProductState, Product> {  
  constructor(protected store: ProductStore) {
    super(store);
  }

  selectVisibleProducts(): Observable<Product[]> {
    return this.select(state => state.ui.filter)
      .pipe(
        map(filter => this.getAll({ filterBy: product => {
          const substr = filter.name && filter.name.toLocaleLowerCase();
          return product.name && product.name.toLocaleLowerCase().includes(substr);
        }}))
      );
  }
}
