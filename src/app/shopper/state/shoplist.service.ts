import { ShopListStore, ShopList } from './shoplist.state';
import { Injectable } from '@angular/core';
import { ShopListQuery } from './shoplist.query';
import { CategoryService } from './category.service';
import { transaction } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class ShopListService {

    constructor(private shopListStore: ShopListStore, private query: ShopListQuery, private categoryService: CategoryService) { }

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
}
