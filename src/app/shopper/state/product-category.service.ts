import { Injectable } from '@angular/core';
import { guid, ID } from '@datorama/akita';
import { ProductCategoryStore, ProductCategory } from './product-category.state';
import { ProductCategoryQuery } from './product-category.query';

@Injectable({ providedIn: 'root' })
export class ProductCategoryService {

    constructor(private store: ProductCategoryStore, private query: ProductCategoryQuery) {
    }
    
    createOrUpdate(categoryId: ID, categoryName: string): ID {
        const sameNameCategories = this.query.getAll({limitTo: 1, filterBy: e => e.name === categoryName});
        
        if (sameNameCategories && sameNameCategories.length) {
            return sameNameCategories[0].id;
        }

        if (!categoryId) {
            categoryId = guid();
        }
        
        this.store.upsert(categoryId, { name: categoryName });

        return categoryId;
    }
}
