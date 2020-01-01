import { ShoplistCategoryStore, ShoplistCategory } from './shoplist-category.state';
import { Injectable } from '@angular/core';
import { ShoplistCategoryQuery } from './shoplist-category.query';
import { guid } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class ShoplistCategoryService {

    constructor(private categoryStore: ShoplistCategoryStore, private query: ShoplistCategoryQuery) { 
    }

    // Create a category if none exist with the same label
    // If the label already exists, returns the existing category
    createCategory(label: string): ShoplistCategory {
        if (label) {
            const existingCategory = this.query
                .getAll({ filterBy: cat => cat.label === label, limitTo: 1 })
                .find(() => true);

            if (existingCategory) {
                return existingCategory;
            }

            const newCategory = { id: guid(), label } as ShoplistCategory;

            this.categoryStore.add(newCategory);

            return newCategory;
        }
    }

    setFilter(filter: { name: string; }) {
        this.categoryStore.setFilter(filter);
    }
}
