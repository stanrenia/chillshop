import {
    ShopListStore,
    ShopList,
    ShopListItem,
    ShopListUIState,
} from './shoplist.state';
import { Injectable } from '@angular/core';
import {
    ShopListQuery,
    ShopListItemUI,
    ShopListItemGroup,
} from './shoplist.query';
import { ShoplistCategoryService } from './shoplist-category.service';
import {
    transaction,
    ID,
    guid,
    arrayUpdate,
    arrayAdd,
    arrayRemove,
} from '@datorama/akita';
import { ProductService } from './product.service';
import { Template } from 'src/app/templates/state/template.model';
import { DatePipe } from '@angular/common';
import { CollectionConfig } from 'akita-ng-fire';

@Injectable({ providedIn: 'root' })
// @CollectionConfig({ path: 'shoplists' })
export class ShopListService {
    constructor(
        private shopListStore: ShopListStore,
        private query: ShopListQuery,
        private categoryService: ShoplistCategoryService,
        private productService: ProductService,
        private datePipe: DatePipe
    ) {}

    @transaction()
    createShopList(args: CreateShopListArgs): ShopList {
        let categoryId;
        if (args.categoryName) {
            const cat = this.categoryService.createCategory(args.categoryName);
            categoryId = cat && cat.id;
        }

        let items = [];
        if (args.template) {
            const shopListTemplate = this.query.getEntity(args.template.shoplistId);
            items = [...shopListTemplate.items];
        }

        const created = new Date(Date.now());
        const label = this.getLabelOrDefault(args, created);

        const newShoplist = {
            id: guid(),
            label,
            dueDate: args.dueDate,
            items,
            categoryId,
            created
        } as ShopList;
        this.shopListStore.add(newShoplist);

        return newShoplist;
    }

    createShopListFromUncheckedItems(shoplistId: ID): ShopList {
        const uncheckedItems = this.query.getUncheckedItems(shoplistId);
        if (uncheckedItems && uncheckedItems.length) {
            const newShoplist = this.createShopList({
                label: 'Remaining shoplist of ' + new Date().toDateString()
             });
            this.shopListStore.update(newShoplist.id, {
                items: uncheckedItems.map((i) => {
                    return {
                        ...i,
                        id: guid(),
                    };
                }),
            });

            return newShoplist;
        }
    }

    @transaction()
    createShopListItem(
        shoplistId: ID,
        productName: string,
        categoryName: string
    ): ID {
        // Create product if not exists
        const productId = this.productService.createProduct(
            productName,
            categoryName
        );

        const currentItems = this.query.getEntity(shoplistId).items;
        const existingItem = currentItems.find(
            (i) => i.productId === productId
        );

        let entityId;
        // If item exists, increment its quantity by 1
        if (existingItem) {
            const quantity = existingItem.quantity + 1;
            this.shopListStore.update(shoplistId, (entity) => ({
                items: arrayUpdate(entity.items, existingItem.id, { quantity }),
            }));
            entityId = existingItem.id;
            // Otherwise, create the item
        } else {
            const item = {
                id: guid(),
                productId,
                quantity: 1,
                checked: false,
            } as ShopListItem;
            this.shopListStore.update(shoplistId, (entity) => ({
                items: arrayAdd(entity.items, item),
            }));
            entityId = item.id;
        }

        return entityId;
    }

    update(id: ID, label: string, categoryName: string) {
        const category = this.categoryService.createCategory(categoryName);
        this.shopListStore.update(id, {
            label,
            categoryId: category && category.id,
        });
    }

    updateItem(
        shoplistId: ID,
        itemId: ID,
        propsToUpdate: Partial<ShopListItemUI>
    ) {
        const item = this.query
            .getEntity(shoplistId)
            .items.find((i) => i.id === itemId);

        if (propsToUpdate.productName) {
            this.productService.updateProduct(item.productId, {
                name: propsToUpdate.productName,
            });
            delete propsToUpdate.productName;
        }

        if (propsToUpdate.productCategoryName) {
            this.productService.updateProductCategory(
                item.productId,
                propsToUpdate.productCategoryName
            );
            delete propsToUpdate.productCategoryName;
        }

        this.shopListStore.update(shoplistId, (entity) => ({
            items: arrayUpdate(entity.items, itemId, propsToUpdate),
        }));
    }

    remove(shoplistId: ID) {
        this.shopListStore.remove(shoplistId);
    }

    removeItem(shoplistId: ID, itemId: ID) {
        this.shopListStore.update(shoplistId, (entity) => ({
            items: arrayRemove(entity.items, itemId),
        }));
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
                categories: categoryName,
            },
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
                    [categoryId]: sortedItems.map((i) => i.id),
                },
            },
        };

        this.shopListStore.updateUIState(nextUiState);
    }

    setAsDone(shoplistId: ID): void {
        this.shopListStore.update(shoplistId, { done: true });
    }

    setAsTemplate(shoplistId: ID): void {
        this.shopListStore.update(shoplistId, { isTemplate: true });
    }

    toggleItemCheck(shoplistId: ID, item: ShopListItem): any {
        this.updateItem(shoplistId, item.id, { checked: !item.checked });
    }

    toggleItemGroupVisibility(itemGroup: ShopListItemGroup): void {
        const uiState = this.query.getValue().ui;

        const hiddenIds = [...uiState.itemGroups.hiddenIds];
        if (itemGroup.hideItems) {
            const indexToRemove = hiddenIds.findIndex(
                (id) => id === itemGroup.categoryId
            );
            hiddenIds.splice(indexToRemove, 1);
        } else {
            hiddenIds.push(itemGroup.categoryId);
        }

        const nextUiState = <ShopListUIState>{
            ...uiState,
            itemGroups: {
                ...uiState.itemGroups,
                hiddenIds,
            },
        };

        this.shopListStore.updateUIState(nextUiState);
    }

    private getLabelOrDefault(args: CreateShopListArgs, created: Date): string {
        if (args.label?.trim()) {
            return args.label.trim();
        }

        const refDate = args.dueDate || created;
        return `List of ${this.datePipe.transform(refDate, 'dd/MM/yyyy')}`;
    }
}

export interface CreateShopListArgs {
    label?: string;
    categoryName?: string;
    dueDate?: Date;
    template?: Template;
}
