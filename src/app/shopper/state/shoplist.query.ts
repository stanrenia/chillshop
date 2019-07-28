import { QueryEntity, ID } from '@datorama/akita';
import { ShopListState, ShopListStore, ShopList, ShopListItem } from './shoplist.state';
import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, auditTime } from 'rxjs/operators';
import { ShoplistCategoryQuery } from './shoplist-category.query';
import { ProductQuery } from './product.query';
import { ProductCategoryQuery } from './product-category.query';

@Injectable({ providedIn: 'root' })
export class ShopListQuery extends QueryEntity<ShopListState, ShopList> {
  constructor(protected store: ShopListStore, private categoryQuery: ShoplistCategoryQuery, private productQuery: ProductQuery,
    private productCategoryQuery: ProductCategoryQuery) {
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
            const category = this.productCategoryQuery.getEntity(product.categoryId);

            return { 
              ...item, 
              productName: product.name, 
              productCategoryName: category && category.name,
              productCategoryId: category && category.id,
            } as ShopListItemUI;
          });
        }

        return [];
      })
    )

    return items$;
  }

  public getItemsGroupByCategory(id: ID): Observable<ShopListItemGroup[]> {
    return combineLatest(
      this.getItemsByShopListId(id),
      this.select(state => state.ui.itemGroups.hiddenIds)
    )
    .pipe(
      map(([uiItems, hiddenItemGroups]) => {
        let itemGroups = [];
        if (uiItems && uiItems.length) {
          const grouping = this.groupItemsByCategory(uiItems);

          itemGroups = Object.values(grouping)
            .map(group => {
              group.hideItems = hiddenItemGroups.includes(group.categoryId);
              return group;
            })
            .sort((a, b) => ('' + a.categoryName).localeCompare(b.categoryName));
        }

        return itemGroups;
      })
    )
  }

  public getShopListName(id: string | number): string {
    return this.getEntity(id).label;
  }

  public getShopListItem(shoplistId: ID, itemId: ID): ShopListItem {
    return this.getEntity(shoplistId).items.find(i => i.id === itemId);
  }

  private groupItemsByCategory(uiItems: ShopListItemUI[]): {[id: string]: ShopListItemGroup} {
    return uiItems.reduce((acc, next) => {
      if (!acc[next.productCategoryId]) {
        acc[next.productCategoryId] = <ShopListItemGroup>{
          categoryId: next.productCategoryId,
          categoryName: next.productCategoryName,
          items: []
        }
      }

      acc[next.productCategoryId].items.push(next);
      
      return acc;
    }, {});
  }
}

export interface ShopListUI {
  id: ID;
  label: string;
  categoryName?: string;
  itemCount?: number;
}

export interface ShopListItemUI extends ShopListItem {
  productName: string;
  productCategoryName: string;
  productCategoryId: ID;
}

export interface ShopListItemGroup {
  categoryId: ID;
  categoryName: string;
  items: ShopListItemUI[];
  hideItems: boolean;
}