import { QueryEntity } from '@datorama/akita';
import { ShopListState, ShopListStore, ShopList } from './shoplist.state';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShopListQuery extends QueryEntity<ShopListState, ShopList> {  
  constructor(protected store: ShopListStore) {
    super(store);
  }
}
