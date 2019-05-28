import { ShopListStore, ShopList, ShopListItem } from './shoplist.state';
import { Injectable } from '@angular/core';
import { ShopListQuery } from './shoplist.query';
import { ShoplistCategoryService } from './shoplist-category.service';
import { transaction, ID } from '@datorama/akita';
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
    createShopListItem(shoplistId: ID, productName: string, categoryName: string) {
        this.productService.createProduct(productName, categoryName);
        
        // TODO CONTINUE
        // const item: ShopListItem = {
        //     productId
        // }

        // this.shopListStore.update(shoplistId, entity => ({
        //    items: [...entity.items, ] 
        // }));
    }
}
