import { ShopListStore, ShopList, ShopListItem } from './shoplist.state';
import { Injectable } from '@angular/core';
import { ShopListQuery } from './shoplist.query';
import { ShoplistCategoryService } from './shoplist-category.service';
import { transaction, ID, guid, arrayUpdate, arrayAdd, arrayFind } from '@datorama/akita';
import { ProductService } from './product.service';

@Injectable({ providedIn: 'root' })
export class ShopListService {

    constructor(private shopListStore: ShopListStore, private query: ShopListQuery, private categoryService: ShoplistCategoryService,
        private productService: ProductService) { }

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
            this.shopListStore.update(shoplistId, entity => ({
                items: arrayUpdate(entity.items, existingItem.id, { quantity })
            }));
            
            entityId = existingItem.id;
        // Otherwise, create the item
        } else {
            const item = { id: guid(), productId, quantity: 1 } as ShopListItem;
            
            this.shopListStore.update(shoplistId, entity => ({
                items: arrayAdd(entity.items, item)
            }));

            entityId = item.id;
        }

        return entityId;
    }

    updateItem(shoplistId: ID, itemId: ID, item: Partial<ShopListItem>) {
        this.shopListStore.update(shoplistId, entity => ({
            items: arrayUpdate(entity.items, itemId, { quantity: item.quantity })
        }));
    }
}
