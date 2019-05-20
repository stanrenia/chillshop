import { CategoryStore, Category } from './category.state';
import { Injectable } from '@angular/core';
import { CategoryQuery } from './category.query';

@Injectable({ providedIn: 'root' })
export class CategoryService {

    constructor(private categoryStore: CategoryStore, private query: CategoryQuery) { }

    createCategory(label: string): Category {
        // Do not create if label already exists
        if (this.query.hasEntity(cat => cat.label === label)) {
            return;
        }

        const count = this.query.getCount();
        const newCategory = { id: count + 1, label } as Category;
        this.categoryStore.add(newCategory);

        return newCategory;
    }
}
