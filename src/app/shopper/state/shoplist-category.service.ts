import { ShoplistCategoryStore, ShoplistCategory } from './shoplist-category.state';
import { Injectable } from '@angular/core';
import { ShoplistCategoryQuery } from './shoplist-category.query';

@Injectable({ providedIn: 'root' })
export class ShoplistCategoryService {

    constructor(private categoryStore: ShoplistCategoryStore, private query: ShoplistCategoryQuery) { 
    }

    createCategory(label: string): ShoplistCategory {
        // Do not create if label already exists
        if (this.query.hasEntity(cat => cat.label === label)) {
            return;
        }

        const count = this.query.getCount();
        const newCategory = { id: count + 1, label } as ShoplistCategory;

        this.categoryStore.add(newCategory);

        return newCategory;
    }
}
