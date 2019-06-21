import { QueryEntity, ID } from '@datorama/akita';
import { ShopListState, ShopListStore, ShopList, ShopListItem } from './shoplist.state';
import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { map, auditTime } from 'rxjs/operators';
import { ShoplistCategoryQuery } from './shoplist-category.query';
import { ProductQuery } from './product.query';

export interface ShopListItemUI extends ShopListItem {
  productName: string;
}

@Injectable({ providedIn: 'root' })
export class ShopListQuery extends QueryEntity<ShopListState, ShopList> {
  constructor(protected store: ShopListStore, private categoryQuery: ShoplistCategoryQuery, private productQuery: ProductQuery) {
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

  public getItemsByShopListId(id: string | number): Observable<ShopListItemUI[]> {
    const items$ = this.selectEntity(id).pipe(
      map(sl => {
        if (sl.items && sl.items.length) {
          return sl.items.map(item => {
            const product = this.productQuery.getEntity(item.productId);

            return { ...item, productName: product.name } as ShopListItemUI;
          });
        }

        return [];
      })
    )

    return items$;
  }

  public getShopListName(id: string | number): string {
    return this.getEntity(id).label;
  }

  public getShopListItem(shoplistId: ID, itemId: ID): ShopListItem {
    return this.getEntity(shoplistId).items.find(i => i.id === itemId);
  }
}

export interface ShopListUI {
  id: ID;
  label: string;
  categoryName?: string;
  itemCount?: number;
}