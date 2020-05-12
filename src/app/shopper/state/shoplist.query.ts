import { QueryEntity, ID } from '@datorama/akita';
import { ShopListState, ShopListStore, ShopList, ShopListItem } from './shoplist.state';
import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, auditTime } from 'rxjs/operators';
import { ShoplistCategoryQuery } from './shoplist-category.query';
import { ProductQuery } from './product.query';
import { ProductCategoryQuery } from './product-category.query';
import { ProductCategory } from './product-category.state';
import { ArrayUtils } from '../services/utils/array-utils';

@Injectable({ providedIn: 'root' })
export class ShopListQuery extends QueryEntity<ShopListState, ShopList> {
  constructor(protected store: ShopListStore, private categoryQuery: ShoplistCategoryQuery, private productQuery: ProductQuery,
    private productCategoryQuery: ProductCategoryQuery, private arrayUtils: ArrayUtils) {
    super(store);
  }

  public getAllForUI(args: GetAllForUIArgs = { archived: false }): Observable<ShopListUI[]> {
    return combineLatest([
      this.selectAll({ filterBy: e => !e.isTemplate && (args.archived ? e.done : !e.done) }),
      this.categoryQuery.selectAll({ asObject: true })
    ]).pipe(
      auditTime(0),
      map(([shoplists, categories]) => {
        return shoplists.map(sl => {
          const cat = categories[sl.categoryId];

          return <ShopListUI>{
            id: sl.id,
            label: sl.label,
            categoryName: cat && cat.label,
            itemCount: sl.items && sl.items.length,
            done: sl.done
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
    );

    return items$;
  }

  public getItemsGroupByCategory(id: ID): Observable<ShopListItemGroup[]> {
    return combineLatest([
      this.getItemsByShopListId(id),
      this.select(state => state.ui.itemGroups)
    ]
    )
    .pipe(
      map(([uiItems, uiItemGroups]) => {
        const hiddenItemGroups = uiItemGroups.hiddenIds;

        let itemGroups = [];
        if (uiItems && uiItems.length) {
          const grouping = this.groupItemsByCategory(uiItems);

          itemGroups = Object.values(grouping)
            .map(group => {
              group.hideItems = hiddenItemGroups.includes(group.categoryId);
              const sortedIds = uiItemGroups.sortedItemsById[group.categoryId] || [];
              group.items = this.arrayUtils.sortFromReferenceList<ShopListItemUI>(group.items, sortedIds, e => e.id);
              return group;
            })
            .sort((a, b) => ('' + a.categoryName).localeCompare(b.categoryName));
        }

        return itemGroups;
      })
    );
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
          checkedCount: 0,
          items: []
        }
      }

      if (next.checked) {
        acc[next.productCategoryId].checkedCount += 1;
      }

      acc[next.productCategoryId].items.push(next);

      return acc;
    }, {});
  }

  public selectVisibleProductCategories(): Observable<ProductCategory[]> {
    return combineLatest([
      this.productCategoryQuery.selectAll(),
      this.select(state => state.ui.filters.categories)
    ]).pipe(
      map(([categories, categoryFilter]) => {
        const substr = categoryFilter && categoryFilter.toLocaleLowerCase();
        return categories.filter(cat => cat.name.toLocaleLowerCase().includes(substr));
      })
    );
  }

  public hasAnyUncheckedItems(shoplistId: ID): boolean {
    const items = this.getEntity(shoplistId).items;
    return items && items.length && items.some(i => !i.checked);
  }

  public getUncheckedItems(shoplistId: ID): ShopListItem[] {
    const items = this.getEntity(shoplistId).items;
    return items && items.length && items.filter(i => !i.checked);
  }
}

export interface ShopListUI {
  id: ID;
  label: string;
  categoryName?: string;
  itemCount?: number;
  done: boolean;
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
  checkedCount: number;
}

export interface GetAllForUIArgs {
  archived: boolean;
}
