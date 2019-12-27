import { ShopListStore, ShopList, ShopListItem, ShopListUIState } from './shoplist.state';
import { Injectable } from '@angular/core';
import { ShopListQuery, ShopListItemUI, ShopListItemGroup } from './shoplist.query';
import { ShoplistCategoryService } from './shoplist-category.service';
import { transaction, ID, guid, arrayUpdate, arrayAdd, arrayRemove } from '@datorama/akita';
import { ProductService } from './product.service';
import { ProductCategoryService } from './product-category.service';

@Injectable({ providedIn: 'root' })
export class ShopListService {

    constructor(private shopListStore: ShopListStore, private query: ShopListQuery, private categoryService: ShoplistCategoryService,
        private productService: ProductService, private productCategoryService: ProductCategoryService) { }

    @transaction()
    createShopList(label: string, categoryName: string) {
        let categoryId;
        if (categoryName) {
            const cat = this.categoryService.createCategory(categoryName);
            categoryId = cat && cat.id;
        }

        const count = this.query.getCount();
        this.shopListStore.add({ id: count + 1, label, items: [], categoryId } as ShopList);
    }

    @transaction()
    createShopListItem(shoplistId: ID, productName: string, categoryName: string): ID {
        // Create product if not exists
        const productId = this.productService.createProduct(productName, categoryName);

        const currentItems = this.query.getEntity(shoplistId).items;
        const existingItem = currentItems.find(i => i.productId === productId);

        let entityId;
        // If item exists, increment its quantity by 1
        if (existingItem) {
            const quantity = existingItem.quantity + 1;
            this.shopListStore.update(shoplistId, arrayUpdate<ShopList, ShopListItem>('items', existingItem.id, { quantity }));
            entityId = existingItem.id;
        // Otherwise, create the item
        } else {
            const item = { id: guid(), productId, quantity: 1, checked: false } as ShopListItem;
            this.shopListStore.update(shoplistId, arrayAdd<ShopList>('items', item));
            entityId = item.id;
        }

        return entityId;
    }

    updateItem(shoplistId: ID, itemId: ID, propsToUpdate: Partial<ShopListItemUI>) {
        const item = this.query.getEntity(shoplistId).items.find(i => i.id === itemId);
        
        if (propsToUpdate.productName) {
            this.productService.updateProduct(item.productId, { name: propsToUpdate.productName });
            delete propsToUpdate.productName;
        }
        
        if (propsToUpdate.productCategoryName) {
            this.productService.updateProductCategory(item.productId, propsToUpdate.productCategoryName);
            delete propsToUpdate.productCategoryName;
        }

        this.shopListStore.update(shoplistId, arrayUpdate<ShopList, ShopListItem>('items', itemId, propsToUpdate));
    }

    removeItem(shoplistId: ID, itemId: ID) {
        this.shopListStore.update(shoplistId, arrayRemove<ShopList>('items', itemId));
    }

    toggleItemCheck(shoplistId: ID, item: ShopListItem): any {
        this.updateItem(shoplistId, item.id, { checked: !item.checked });
    }

    toggleItemGroupVisibility(itemGroup: ShopListItemGroup): void {
        const uiState = this.query.getValue().ui;

        const hiddenIds = [...uiState.itemGroups.hiddenIds];
        if (itemGroup.hideItems) {
            const indexToRemove = hiddenIds.findIndex(id => id === itemGroup.categoryId);
            hiddenIds.splice(indexToRemove, 1);
        } else {
            hiddenIds.push(itemGroup.categoryId);
        }

        const nextUiState = <ShopListUIState>{
            ...uiState,
            itemGroups: {
                ...uiState.itemGroups,
                hiddenIds
            }
        };

        this.shopListStore.updateUIState(nextUiState);
    }


    setCategoryFilter(categoryName): void {
        const uiState = this.query.getValue().ui;

        if (categoryName === '') {
            categoryName = null;
        }

        const nextUiState = {
            ...uiState,
            filters: {
                ...uiState.filters,
                categories: categoryName
            }
        };

        this.shopListStore.updateUIState(nextUiState);
    }

    setItemsOrder(categoryId: ID, sortedItems: ShopListItemUI[]): void {
        const uiState = this.query.getValue().ui;

        const nextUiState: ShopListUIState = {
            ...uiState,
            itemGroups: {
                ...uiState.itemGroups,
                sortedItemsById: {
                    ...uiState.itemGroups.sortedItemsById,
                    [categoryId]: sortedItems.map(i => i.id)
                }
            }
         };

        this.shopListStore.updateUIState(nextUiState);
    }
}
