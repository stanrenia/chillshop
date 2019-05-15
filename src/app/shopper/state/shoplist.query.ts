import { QueryEntity } from '@datorama/akita';
import { ShopListState, ShopListStore, ShopList, ShopListItem } from './shoplist.state';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShopListQuery extends QueryEntity<ShopListState, ShopList> {
  constructor(protected store: ShopListStore) {
    super(store);
  }

  public getItemsByShopListId(id: string | number): Observable<ShopListItem[]> {
    const items = this.getEntity(id).items || [];
    return of(items);
  }
}
