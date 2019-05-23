import { QueryEntity, ID } from '@datorama/akita';
import { ShopListState, ShopListStore, ShopList, ShopListItem } from './shoplist.state';
import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { map, auditTime } from 'rxjs/operators';
import { ShoplistCategoryQuery } from './shoplist-category.query';

@Injectable({ providedIn: 'root' })
export class ShopListQuery extends QueryEntity<ShopListState, ShopList> {
  constructor(protected store: ShopListStore, private categoryQuery: ShoplistCategoryQuery) {
    super(store);
  }

  public getAllForUI(): Observable<ShopListUI[]> {
    return combineLatest(
      this.selectAll(),
      this.categoryQuery.selectAll({ asObject: true })
    ).pipe(
      auditTime(0),
      map(([shoplists, categories]) => {
        return shoplists.map(sl => {
          const cat = categories[sl.categoryId];

          return <ShopListUI>{
            id: sl.id,
            label: sl.label,
            categoryName: cat && cat.label,
            itemCount: sl.items && sl.items.length
          };
        })
      })
    );
  }

  public getItemsByShopListId(id: string | number): Observable<ShopListItem[]> {
    const items = this.getEntity(id).items || [];
    return of(items);
  }
}

export interface ShopListUI {
  id: ID;
  label: string;
  categoryName?: string;
  itemCount?: number;
}