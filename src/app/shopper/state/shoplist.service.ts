import { ShopListStore, ShopList, ShopListItem } from './shoplist.state';
import { Injectable } from '@angular/core';
import { ShopListQuery } from './shoplist.query';
import { ShoplistCategoryService } from './shoplist-category.service';
import { transaction, ID, guid } from '@datorama/akita';
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
        this.shopListStore.add({ id: count + 1, label, categoryId } as ShopList);
    }

    @transaction()
    createShopListItem(shoplistId: ID, productName: string, categoryName: string): ID {
        // Create product if not exists
        const productId = this.productService.createProduct(productName, categoryName);

        const item = { id : guid(), productId } as ShopListItem;

        this.shopListStore.update(shoplistId, entity => {
            let items = entity.items || [];
            items = [...items, item];

            return { items };
        });

        return item.id;
    }
}
