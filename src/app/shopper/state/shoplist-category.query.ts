import { QueryEntity } from '@datorama/akita';
import { ShoplistCategoryState, ShoplistCategoryStore, ShoplistCategory } from './shoplist-category.state';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ShoplistCategoryQuery extends QueryEntity<ShoplistCategoryState, ShoplistCategory> {
  constructor(protected store: ShoplistCategoryStore) {
    super(store);
  }

  selectVisibleCategories(): Observable<ShoplistCategory[]> {
    return this.select(state => state.ui.filter)
      .pipe(
        map(filter => this.getAll({ filterBy: cat => {
          const substr = filter.name && filter.name.toLocaleLowerCase();
          return cat.label && cat.label.toLocaleLowerCase().includes(substr);
        }}))
      );
  }
}
