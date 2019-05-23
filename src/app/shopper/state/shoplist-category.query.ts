import { QueryEntity } from '@datorama/akita';
import { ShoplistCategoryState, ShoplistCategoryStore, ShoplistCategory } from './shoplist-category.state';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShoplistCategoryQuery extends QueryEntity<ShoplistCategoryState, ShoplistCategory> {  
  constructor(protected store: ShoplistCategoryStore) {
    super(store);
  }
}
