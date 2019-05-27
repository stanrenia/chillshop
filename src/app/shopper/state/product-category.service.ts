import { Injectable } from '@angular/core';
import { guid } from '@datorama/akita';
import { ProductCategoryStore, ProductCategory } from './product-category.state';

@Injectable({ providedIn: 'root' })
export class ProductCategoryService {

    constructor(private store: ProductCategoryStore) {
    }
    
    createProductCategory(name: string): any {
        let categoryId;    

    }
}
